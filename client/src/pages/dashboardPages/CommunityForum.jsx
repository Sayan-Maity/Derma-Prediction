/* eslint-disable prettier/prettier */
import { Flex, Button, useToast, Input, Modal, ModalContent, ModalOverlay, ModalBody, ModalCloseButton, useDisclosure, Text, Image, useTheme, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import RenderedContent from '../../components/RenderedContent';
import DashboardWrapper from '../../components/DashboardWrapper';
import { postCommunityForum } from '../../services/community-forum/postCommunityForum';
import { getBlogPosts } from '../../services/community-forum/getBlogPosts';
const CommunityForum = () => {
    const toast = useToast();
    const theme = useTheme()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [blogPosts, setBlogPosts] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogBannerImage, setBlogBannerImage] = useState('');
    const { isOpen: checkIsOpenModal, onOpen: openModal, onClose: closeModal } = useDisclosure()

    const [viewBlogPostObject, setViewBlogPostObject] = useState({
        title: blogTitle,
        author: blogAuthor,
        bannerImage: blogBannerImage,
        content: [],
    });

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleSaveClick = async () => {
        if (blogTitle === "" || blogAuthor === "" || blogBannerImage === "") {
            toast({
                title: "Please fill all the fields",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
            return;
        }
        const contentState = editorState.getCurrentContent();
        const rawContentState = JSON.stringify(convertToRaw(contentState));

        try {
            const res = await postCommunityForum({
                content: rawContentState,
                title: blogTitle,
                author: blogAuthor,
                bannerImage: blogBannerImage,
            });
            if (res.status === 200) {
                toast({
                    title: "Your story is live !",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                  });
                setBlogAuthor('');
                setBlogTitle('');
                setBlogBannerImage('');
                setEditorState(EditorState.createEmpty());
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to load content from backend, assuming you have a rawContentState
    // const loadContentFromBackend = (rawContentState) => {
    //     try {
    //         const contentState = convertFromRaw(JSON.parse(rawContentState));
    //         const plainText = contentState.getPlainText();
    //         setEditorState(EditorState.createWithContent(plainText));
    //     } catch (error) {
    //         console.error('Error parsing JSON:', error);
    //     }
    // };

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const res = await getBlogPosts();
                const reversedData = res.data.reverse();
                setBlogPosts(reversedData);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogPosts();
    }, [blogPosts]);

    const viewSinglePost = (id) => {
        const post = blogPosts.find((post) => post._id === id);

        // load the post in viewBlogPostObject
        const contentState = convertFromRaw(JSON.parse(post?.content));
        const blocks = contentState.getBlocksAsArray();
        setViewBlogPostObject({
            title: post.title,
            author: post.author,
            bannerImage: post.bannerImage,
            content: blocks,
        });

        openModal();
    };

    // Truncate function to limit the content length
    // const truncateContent = (content, maxLength) => {
    //     if (content.length > maxLength) {
    //         return content.substring(0, maxLength) + '...';
    //     }
    //     return content;
    // };

    return (
        <DashboardWrapper>
            <Modal isOpen={checkIsOpenModal} onClose={closeModal} isCentered size="4xl">
                <ModalOverlay />
                <ModalContent width="100%" borderRadius={"20px"}>
                    <ModalCloseButton />
                    <ModalBody width="100%" >
                        <Flex flexDir="column" maxH="80vh" overflowY="scroll" alignItems="center" justifyContent="center" width="100%" borderRadius="5px" p="1rem">
                            <Flex flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%" gap={"1rem"}>
                                <Heading>{viewBlogPostObject?.title}</Heading>
                                <Text display="flex" alignItems="center" >Author :<Text ml={"0.5rem"} p="0 5px" borderRadius="5px" backgroundColor={theme.colors.brand.primary_green_dark}> {viewBlogPostObject?.author}</Text> </Text>
                                <Image src={viewBlogPostObject?.bannerImage} h={60} borderRadius={"20px"} />
                                <div>
                                    {viewBlogPostObject?.content.map((block, index) => {
                                        const text = block.getText();
                                        const isBold = block.getInlineStyleAt(0).has('BOLD'); // Check if the first character is bold
                                        const isEmpty = text.trim() === '';

                                        return (
                                            <div key={index} style={{ fontWeight: isBold ? 'bold' : 'normal', whiteSpace: 'pre-wrap', fontStyle: isEmpty ? 'italic' : 'normal', }}>
                                                {text}
                                            </div>
                                        );
                                    })}
                                </div>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Flex flexDir="row" h="90vh" width="100%" alignItems="center" justifyContent="center" gap="1rem">

                <VStack width="40%" borderRight="1px solid #e4e6ea" alignItems="flex-start" justifyContent="flex-start" gap="1rem">
                    <Heading fontSize="2rem">Check what World wants to share</Heading>
                    <Flex w="100%" flexDir="column" alignItems="center" pr="1rem" gap="1rem" maxH="100vh" h="80vh" overflowY="auto" >
                        {blogPosts.length === 0 ? (
                            <VStack height="100%" alignItems="center" justifyContent="center">
                                <Text>No posts yet !</Text>
                                <Text>Be the first person to share your story</Text>
                            </VStack>
                        ) : (
                            blogPosts.map((post) => (
                                <Flex key={post._id} flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%" border={`2px solid ${theme.colors.brand.primary_green_dark}`} borderRadius="20px" p="1rem">
                                    <Flex flexDir="column" alignItems="flex-start" justifyContent="flex-start" width="100%" gap={"1rem"}>
                                        <RenderedContent key={post._id} rawContentState={post.content} author={post?.author} />
                                        <Button onClick={() => viewSinglePost(post._id)} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                                            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                                            color: `${theme.colors.button.hover_light_color}`,
                                            border: `${theme.colors.button.hover_light_border}`
                                        }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">View Post</Button>
                                    </Flex>
                                </Flex>
                            ))
                        )}
                    </Flex>
                </VStack>

                <VStack width="100%" maxH="100vh" h="90vh" alignItems="flex-start" justifyContent="flex-start" p="0 1rem">
                    <Flex justifyContent="space-between" w="100%">
                        <Flex>
                            <Heading fontSize="2rem">Share your story !</Heading>
                        </Flex>
                        <Flex>
                            <Button onClick={handleSaveClick} backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
                                backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                                color: `${theme.colors.button.hover_light_color}`,
                                border: `${theme.colors.button.hover_light_border}`
                            }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Post Story</Button>
                        </Flex>
                    </Flex>
                    <Flex flexDir="column" gap="1rem" m="1rem 0" w="100%">
                        <Input value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} placeholder='Author name' _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }} />
                        <Input value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder='Write your blog title' _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }} />
                        <Input value={blogBannerImage} onChange={(e) => setBlogBannerImage(e.target.value)} placeholder="Give a banner image url starting with ' https:// ' " _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }} />
                    </Flex>

                    <Flex p="0.5rem 1rem" borderRadius="0.375rem" width="100%" height="100%" overflowY="auto" border={`2px solid ${theme.colors.brand.primary_green_dark}`} >
                        <Editor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            placeholder="Start typing...                                                                                                                                                                                                                                                         "
                        />
                    </Flex>
                </VStack>

            </Flex>
        </DashboardWrapper>
    );
};

export default CommunityForum;
