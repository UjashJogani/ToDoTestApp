import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { receivePostListData } from '../../../redux/actionCreator/Post';
import { selectPostList } from '../../../redux/reducers/postSlice';
import { COLORS, FS, IMAGES } from '../../../constants';
import { CustomSpinner } from '../../common';

const PAGE_SIZE = 10;  // Number of posts to load per page

const PostScreen = () => {
    const dispatch = useDispatch();
    const postListData = useSelector(selectPostList);  // Selects post list data from the Redux store
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedPosts, setDisplayedPosts] = useState([]);

    // Effect to fetch posts data on component mount
    useEffect(() => {
        fectPostsData(true);
    }, []);

    // Function to fetch posts data
    const fectPostsData = async (isInitial = false) => {
        await dispatch(receivePostListData(dispatch));
        if (isInitial) {
            setDisplayedPosts(postListData.slice(0, PAGE_SIZE));
        }
    };

    // Effect to load more posts when postListData changes and not refreshing
    useEffect(() => {
        if (!isRefresh) {
            loadMorePosts();
        }
    }, [postListData]);

    // Function to load more posts for pagination
    const loadMorePosts = () => {
        const newPage = currentPage + 1;
        const newPosts = postListData.slice(0, newPage * PAGE_SIZE);
        setDisplayedPosts(newPosts);
        setCurrentPage(newPage);
    };

    // Function to render each post item
    const renderPostData = ({ item }) => (
        <View style={styles.postContainer}>
            <View>
                <View style={styles.postHeader}>
                    <Image source={IMAGES.POST_ICON} style={styles.postIcon} />
                    <Text style={styles.postTitle}>{item.title}</Text>
                </View>
                <Text style={styles.postBody}>{item.body}</Text>
            </View>
        </View>
    );

    // Function to handle pull-to-refresh
    const onRefresh = () => {
        setIsRefresh(true);
        setCurrentPage(1);
        fectPostsData(true);
        setTimeout(() => {
            setIsRefresh(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedPosts}  // Data for FlatList
                style={styles.flatList}
                contentContainerStyle={styles.flatListContent}
                renderItem={renderPostData}  // Render function for each post
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <View>
                        <Text style={styles.emptyListView}>
                            Your Post List is Empty!{'\n'}
                            <Text style={styles.emptyListSubText}> Please Enter some Post </Text>
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        colors={[COLORS.DARK_GOLD, COLORS.MAIN_COLOR, COLORS.BG_GREY]}
                        refreshing={isRefresh}
                        onRefresh={onRefresh}  // Pull-to-refresh handler
                    />
                }
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                    if (displayedPosts.length < postListData.length && !isRefresh) {
                        setIsLoading(true);
                        loadMorePosts();  // Load more posts when end is reached
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 2000);
                    }
                }}
            />
            {/* Spinner to indicate loading */}
            <CustomSpinner isActive={isLoading} />
        </View>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    flatList: {
        marginTop: 10,
    },
    flatListContent: {
        paddingBottom: 30,
    },
    postContainer: {
        backgroundColor: COLORS.WHITE,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    postHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.DARK_GOLD,
        alignItems: 'center',
    },
    postIcon: {
        height: 25,
        width: 25,
        marginLeft: 10,
    },
    postTitle: {
        color: COLORS.WHITE,
        padding: 10,
        textTransform: 'capitalize',
        fontSize: FS.FS16,
        fontWeight: '600',
        flex: 1,
    },
    postBody: {
        color: COLORS.BLACK,
        padding: 5,
    },
    emptyListView: {
        fontSize: FS.FS18,
        color: COLORS.BLACK,
        textAlign: 'center',
        marginTop: 20
    }
})