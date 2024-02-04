/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { Button, Flex, Input, ListItem, Text, UnorderedList, useTheme, useToast } from "@chakra-ui/react";
import { SkinDiseaseItems } from "../../constants/SkinDiseaseItems"
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import DashboardWrapper from "../../components/DashboardWrapper";

const Page3 = () => {
  const toast = useToast();
  const theme = useTheme()
  const [diseaseName, setDiseaseName] = useState("")
  const [loading, setLoading] = useState(false)
  console.log("Disease name =>", diseaseName)
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [diseaseInformation, setDiseaseInformation] = useState({})
  const [showDiseaseName, setShowDiseaseName] = useState("")

  const handleOpenAIApiCall = async (data) => {
    setDiseaseInformation([])
    setShowDiseaseName(data)
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/educationPrompt`,
        {
          disease: data,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast({
          title: "Disease Generated Successfully",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });

        console.log(response);
        setDiseaseInformation(jsonParser(response.data))
      } else {
        setLoading(false);
        toast({
          title: "Sorry, couldn't generate disease",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [initialItems, setInitialItems] = useState([]);

  useEffect(() => {
    // Initialize filteredItems and initialItems with all items initially
    setFilteredItems(SkinDiseaseItems);
    setInitialItems(SkinDiseaseItems);
  }, []);

  const handleFilterSkinDisease = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter your list based on the input text
    const filteredDisease = initialItems.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredItems(filteredDisease);
  }

  const jsonParser = (response) => {
    try {
      if (response && response.content) {
        const jsonRegex = /```json\s*([\s\S]+)\s*```/; // Define a regular expression
        const match = response.content.match(jsonRegex); // Extract the JSON string

        if (match && match[1]) {
          const trimmedJsonStr = match[1].trim(); // Remove leading and trailing whitespaces
          const jsonObj = JSON.parse(trimmedJsonStr);

          // console.log("here =>", jsonObj);
          return jsonObj;
        } else {
          console.error('No JSON object found in the response.');
          return null;
        }
      } else {
        console.error('Invalid response format. No content property found.');
        return null;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
      return null;
    }
  };

  return (
    <DashboardWrapper >
      <Flex width="100%" alignItems="flex-start">
        <Flex width="40%" flexDir="column" alignItems="center" pr="1rem" gap="1rem" maxH="100vh" h="90vh" overflowY="auto">
          <Flex gap="1rem" w="100%">
            <Input type="text" placeholder="Search here ..." value={searchText} onChange={handleFilterSkinDisease} _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }} />
            <Button onClick={() => handleOpenAIApiCall(searchText)} isLoading={loading}><BsSearch /></Button>
          </Flex>

          <Flex flexDir="column" gap="1rem" w="100%">
            {filteredItems.map((item, index) => (
              <Button isDisabled={loading} variant="unstyled" textAlign="left" fontWeight="500" color="#333" key={index} onClick={() => { setDiseaseName(item); handleOpenAIApiCall(item) }} p="0.5rem 2rem" backgroundColor="#81efcc" cursor="pointer" borderRadius="5px">
                <Text>{item}</Text>
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex color="#333" width="60%" maxH="100vh" h="90vh" overflowY="auto" alignItems="flex-start" justifyContent="flex-start" p="0 1rem">
          {!diseaseInformation?.description !== "" && (
            <Flex width="100%" h="90vh" overflowY="auto">
              <Flex gap="1rem" flexDir="column" width="100%">
                <Flex
                  flexDir="column"
                  border="1px solid #e4e6ea"
                  p="1rem"
                  borderRadius="5px"
                  gap="0.5rem"
                >
                  <Text fontWeight="500">Name of disease</Text>
                  <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                    {loading ? (
                      "Searching..."
                    ) :
                      (diseaseInformation?.name)
                    }
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  border="1px solid #e4e6ea"
                  p="1rem"
                  borderRadius="5px"
                  gap="0.5rem"
                >
                  <Text fontWeight="500">Description</Text>
                  <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                    {loading ? (
                      "Searching..."
                    ) :
                      (diseaseInformation?.description)
                    }
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  border="1px solid #e4e6ea"
                  p="1rem"
                  borderRadius="5px"
                  gap="0.5rem"
                >
                  <Text fontWeight="500">Symptoms</Text>
                  <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                    {loading ? (
                      "Searching..."
                    ) :
                      (
                        <UnorderedList>
                          {diseaseInformation?.symptoms?.map((symptom, index) => (
                            <ListItem key={index}>{symptom}</ListItem>
                          ))}
                        </UnorderedList>
                      )
                    }
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  border="1px solid #e4e6ea"
                  p="1rem"
                  borderRadius="5px"
                  gap="0.5rem"
                >
                  <Text fontWeight="500">Causes</Text>
                  <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                    {loading ? (
                      "Searching..."
                    ) :
                      (
                        <UnorderedList>
                          {diseaseInformation?.causes?.map((cause, index) => (
                            <ListItem key={index}>{cause}</ListItem>
                          ))}
                        </UnorderedList>
                      )
                    }
                  </Text>
                </Flex>
                <Flex
                  flexDir="column"
                  border="1px solid #e4e6ea"
                  p="1rem"
                  borderRadius="5px"
                  gap="0.5rem"
                >
                  <Text fontWeight="500">Prevention</Text>
                  <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                    {loading ? (
                      "Searching..."
                    ) :
                      (
                        <UnorderedList>
                          {diseaseInformation?.prevention?.map((prevention, index) => (
                            <ListItem key={index}>{prevention}</ListItem>
                          ))}
                        </UnorderedList>
                      )
                    }
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex height="90vh" alignItems="center">
            {diseaseInformation?.name?.length === 0 && (
              <Flex>
                <Text>{loading ? `😃 Fetching all the information about ${showDiseaseName}` : "👋 Please select any particular disease or search about it !"}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </DashboardWrapper >
  );
};

export default Page3;
