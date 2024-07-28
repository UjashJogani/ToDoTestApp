import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomButton, CustomTextInput } from '../../common';
import { addTodo, deleteTodo, editTodo, getAllTodos, isEmpty } from '../../../utils';
import { COLORS, FS, IMAGES } from '../../../constants';

// HomeScreen component represents the main screen of the To-Do app
const HomeScreen = (props) => {
    // State variables to manage the task text, edit text, list of to-do items, selected item for editing, and modal visibility
    const [taskText, setTaskText] = useState("");
    const [editText, SetEditText] = useState("");
    const [toDoList, setToDoList] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [displayEditModal, setDisplayEditModal] = useState(false);

    // Function to fetch all to-do items from the database
    const GetAllTodos = async () => {
        let data = await getAllTodos();
        setToDoList(data);
    };

    // Fetch to-do items when the component mounts
    useEffect(() => {
        GetAllTodos();
    }, []);

    // Function to add a new task to the to-do list
    const addNewTask = (value) => {
        let data = [...toDoList];
        // Check if the task text is not empty
        if (!isEmpty(value)) {
            // Add the new task to the list
            if (toDoList.length != undefined && toDoList.length > 0) {
                addTodo({ id: Math.floor(1000 + Math.random() * 9000), title: value, completed: false });
                data.push({ id: Math.floor(1000 + Math.random() * 9000), title: value, completed: false });
            }
            setToDoList(data);
            setTaskText("");
        } else {
            // Show an alert if the task text is empty
            Alert.alert("Alert", "Please enter the task title!");
        }
        // Dismiss the keyboard
        Keyboard.dismiss();
    };

    // Function to edit an existing task
    const OnEditItem = (val) => {
        let data = [selectedItem];
        let allToDodata = [...toDoList];
        data[0].title = val;
        editTodo(data[0]);
        allToDodata.map((item) => item.id == data.id ? item.title = val : null);
        setToDoList(allToDodata);
        setSelectedItem([]);
        SetEditText("");
        setDisplayEditModal(false);
    };

    // Function to delete a task from the to-do list
    const OnDeleteItem = (id) => {
        function onDelete() {
            let data = [...toDoList];
            deleteTodo(id);
            data = data.filter((item) => item.id != id);
            setToDoList(data);
        }
        Alert.alert("Delete", "Are you sure you want delete?", [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => onDelete() },
        ]);
    };

    // Function to mark a task as completed or uncompleted
    const OnCompletePress = (item) => {
        let data = [item];
        let allToDodata = [...toDoList];
        data[0].completed = !item.completed;
        editTodo(data[0]);
        allToDodata.map((item) => item.id == data.id ? item.completed = true : null);
        setToDoList(allToDodata);
    };

    // Function to render each to-do item in the list
    const rendertodoList = ({ item, index }) => {
        return (
            <View
                key={index}
                style={[
                    styles.todoContainer,
                    { backgroundColor: item.completed ? COLORS.MAIN_COLOR : COLORS.BG_GREY },
                ]}
            >
                <TouchableOpacity onPress={() => OnCompletePress(item)}>
                    <Image
                        source={!item.completed ? IMAGES.ToDoUN_CHECK : IMAGES.ToDO_CHECK}
                        style={[
                            styles.todoImage,
                            item.completed ? { tintColor: COLORS.GREEN } : { tintColor: COLORS.GREY },
                        ]}
                    />
                </TouchableOpacity>
                <Text style={styles.todoText}>{item.title}</Text>
                <View style={styles.todoActions}>
                    <View style={styles.actionButtons}>
                        {/* Button to open edit modal */}
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: COLORS.GREEN }]}
                            onPress={() => {
                                setSelectedItem(item);
                                SetEditText(item.title);
                                setDisplayEditModal(true);
                            }}
                        >
                            <Image source={IMAGES.TASK_EDIT} style={styles.actionIcon} />
                        </TouchableOpacity>
                        {/* Button to delete the to-do item */}
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: COLORS.RED }]}
                            onPress={() => OnDeleteItem(item.id)}
                        >
                            <Image source={IMAGES.TASK_DELETE} style={styles.actionIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    // Function to render the edit modal
    const selectedTypeModal = () => {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={displayEditModal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setDisplayEditModal(!displayEditModal);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit To-Do Item</Text>
                        <CustomTextInput
                            placeholder="Enter task title"
                            mainStyle={styles.modalTextInput}
                            setValue={SetEditText}
                            value={editText}
                        />
                        <View style={styles.modalButtonsContainer}>
                            <CustomButton
                                title="Edit"
                                containerStyle={styles.modalButton}
                                onClick={() => OnEditItem(editText)}
                            />
                            <CustomButton
                                title="Cancel"
                                containerStyle={[styles.modalButton, { backgroundColor: COLORS.RED }]}
                                onClick={() => setDisplayEditModal(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    // Function to clear the text input field
    const clearPress = () => setTaskText("");

    return (
        <View style={{ flex: 1 }}>
            {/* Main container for the home screen */}
            <View style={styles.container}>
                <Text style={[styles.headerText, { marginTop: 20 }]}>Enter Your Tasks</Text>

                {/* Input field for entering a new task */}
                <CustomTextInput
                    placeholder='Enter task title'
                    mainStyle={styles.textInput}
                    setValue={setTaskText}
                    value={taskText}
                />

                {/* Container for Add and Clear buttons */}
                <View style={styles.buttonsContainer}>
                    {/* Button to add a new task */}
                    <CustomButton
                        title={'Add Task'}
                        containerStyle={styles.addButton}
                        onClick={() => addNewTask(taskText)}
                    />
                    {/* Button to clear the input field */}
                    <CustomButton
                        title={'Clear'}
                        containerStyle={styles.clearButton}
                        onClick={clearPress}
                    />
                </View>

                {/* Header for the to-do list */}
                <View style={styles.header}>
                    <Image source={IMAGES.TODO_ICON} style={styles.headerIcon} />
                    <Text style={styles.headerText}>To-Do Lists</Text>
                </View>

                {/* List to display all to-do items */}
                <FlatList
                    data={toDoList}
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={rendertodoList}
                    ListEmptyComponent={() => (
                        <View>
                            <Text style={styles.emptyListView}>
                                Your To-Do List is Empty!{'\n'}
                                <Text style={{ fontSize: FS.FS16 }}>
                                    Enter some tasks and achieve your goals
                                </Text>
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            {/* Modal for editing a selected to-do item */}
            {selectedTypeModal()}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    textInput: {
        marginVertical: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        flex: 1,
        marginRight: 10,
    },
    clearButton: {
        width: '40%',
        backgroundColor: COLORS.RED,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    headerIcon: {
        height: 50,
        width: 50,
        marginHorizontal: 10,
    },
    headerText: {
        fontSize: FS.FS25,
        color: COLORS.BLACK,
        fontWeight: 'bold',
    },
    flatList: {
        width: '100%',
    },
    flatListContent: {
        paddingBottom: 60,
    },
    todoContainer: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center'
    },
    todoImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
    todoText: {
        fontSize: FS.FS20,
        textTransform: 'capitalize',
        color: COLORS.BLACK,
        fontWeight: '600',
        flex: 1,
    },
    todoActions: {
        alignSelf: 'flex-end',
        flex: 1,
    },
    completeButtonContainer: {
        marginRight: 10,
        padding: 5,
        width: '30%',
        minWidth: '60%',
        alignSelf: 'flex-end',
        marginBottom: 5,
    },
    completeButtonText: {
        fontSize: FS.FS16,
    },
    actionButtons: {
        flexDirection: 'row',
        minWidth: '40%',
        alignSelf: 'flex-end',
    },
    actionButton: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    actionIcon: {
        height: 20,
        width: 20,
        tintColor: COLORS.WHITE,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalText: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: FS.FS20,
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    modalTextInput: {
        marginVertical: 15,
        backgroundColor: COLORS.BG_GREY,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        width: '80%',
    },
    modalButton: {
        marginRight: 10,
        padding: 10,
        width: '50%',
    },
    emptyListView: {
        fontSize: FS.FS18,
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: 20
    }
});
