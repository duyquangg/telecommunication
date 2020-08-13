import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, SafeAreaView, Text } from 'react-native';

import Header from '../components/note/Header';
import ListItem from '../components/note/ListItem';
import AddItem from '../components/note/AddItem';

const Note = () => {
    const [items, setItems] = useState([
        {
            id: Math.random(),
            text: 'Milk',
        },
        {
            id: Math.random(),
            text: 'Eggs',
        },
        {
            id: Math.random(),
            text: 'Bread',
        },
        {
            id: Math.random(),
            text: 'Juice',
        },
    ]);
    // Flag true if user is currently editing an item
    const [editStatus, editStatusChange] = useState(false);

    // State to capture information about the item being edited
    const [editItemDetail, editItemDetailChange] = useState({
        id: null,
        text: null,
    });

    const [checkedItems, checkedItemChange] = useState([]);

    const deleteItem = id => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id !== id);
        });
    };

    // Submit the users edits to the overall items state
    const saveEditItem = (id, text) => {
        setItems(prevItems => {
            return prevItems.map(item =>
                item.id === editItemDetail.id ? { id, text: editItemDetail.text } : item,
            );
        });
        // Flip edit status back to false
        editStatusChange(!editStatus);
        console.log('====> editStatus', editStatus);
    };

    // Event handler to capture users text input as they edit an item
    const handleEditChange = text => {
        editItemDetailChange({ id: editItemDetail.id, text });
    };

    const addItem = text => {
        if (!text) {
            Alert.alert(
                'No item entered',
                'Please enter an item when adding to your shopping list',
                [
                    {
                        text: 'Understood',
                        style: 'cancel',
                    },
                ],
                { cancelable: true },
            );
        } else {
            setItems(prevItems => {
                return [{ id: Math.random(), text }, ...prevItems];
            });
        }
    };

    // capture old items ID and text when user clicks edit
    const editItem = (id, text) => {
        editItemDetailChange({ id, text });
        return editStatusChange(!editStatus);
    };

    const itemChecked = (id, text) => {
        const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
        isChecked.length
            ? // remove item from checked items state (uncheck)
            checkedItemChange(prevItems => {
                return [...prevItems.filter(item => item.id !== id)];
            })
            : // Add item to checked items state
            checkedItemChange(prevItems => {
                return [...prevItems.filter(item => item.id !== id), { id, text }];
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header title="Shopping List" color={'#fff'} />
            <AddItem addItem={addItem} />
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        isEditing={editStatus}
                        editItemDetail={editItemDetail}
                        saveEditItem={saveEditItem}
                        handleEditChange={handleEditChange}
                        itemChecked={itemChecked}
                        checkedItems={checkedItems}
                    />
                )}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default Note;