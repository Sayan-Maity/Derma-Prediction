
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Flex,
  Image,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper";

const DermaDetection = () => {
  const theme = useTheme();
  const toast = useToast();
  const [browsedImagesArray, setBrowsedImagesArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dataUri, setDataUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const [conditionsData, setConditionsData] = useState({});
  const [symptomPrompt, setSymptomPrompt] = useState("");

  const handleMultipleImages = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files);
    setBrowsedImagesArray(imageArray);
  };
  const handleImageChange = (index) => {
    const selectedImage = browsedImagesArray[index];
    setSelectedImage(selectedImage);

    // Selected image converted into Data URI format:
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setDataUri(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!dataUri) {
      setLoading(false);
      toast({
        title: "Please upload an image !",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://bilalsardar-skin-diseases-classification.hf.space/run/predict",
        { data: [dataUri] }
      );
      if (res.status === 200) {
        // console.log(res.data.data[0]);
        handleOpenAIApiCall(res.data.data[0]);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleOpenAIApiCall = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/dermaFinalPrompt`,
        {
          userPrompt: data,
          symptomPrompt: symptomPrompt,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        console.log(response);
        setConditionsData(jsonParser(response.data));
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
    <DashboardWrapper>
      <Flex gap="2rem" width="100%" alignItems="flex-start" flexDir={{base: "column", md: "row"}}>
        <Flex flexDir="column" width={{base: "100%", md: "40%"}} gap="1rem">
          <label
            htmlFor="imageFile"
            className="custom-imageFile-input-magicWand"
            style={{
              backgroundImage: dataUri ? `url(${dataUri})` : "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {browsedImagesArray.length === 0 && <Text>Browse Image</Text>}

            <input
              multiple
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => {
                handleMultipleImages(e);
              }}
              id="imageFile"
            />
          </label>
          {browsedImagesArray.length > 0 && (
            <Flex
              flexDir="row"
              gap="1rem"
              borderRadius="5px"
              border="1px solid #e4e6ea"
              p="0.5rem"
              overflowX={browsedImagesArray.length > 3 ? "scroll" : "hidden"}
            >
              {browsedImagesArray.map((image, index) => (
                <Image
                  border={selectedImage === image ? "3px solid #3ce2ad" : "none"}
                  cursor="pointer"
                  onClick={() => handleImageChange(index)}
                  objectFit="cover"
                  borderRadius="5px"
                  height="5rem"
                  width="5rem"
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected Image ${index}`}
                  className="uploaded-image"
                />
              ))}
            </Flex>
          )}

          <Input
            type="text"
            placeholder="Describe your problem in short (optional)"
            value={symptomPrompt}
            _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }}
            onChange={(e) => setSymptomPrompt(e.target.value)}
          />

          <Button
            onClick={handleUpload}
            isLoading={loading}
            loadingText="Detecting..."
            backgroundColor={theme.colors.brand.primary_green_dark}
            border="2px solid transparent"
            _hover={{
              backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
              color: `${theme.colors.button.hover_light_color}`,
              border: `${theme.colors.button.hover_light_border}`
            }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="10px">Submit</Button>
        </Flex>

        <Flex width={{base: "100%", md: "60%"}} h={{base: "full", md: "90vh"}} overflowY="auto">
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
                  "Detecting..."
                ) :
                  conditionsData?.name
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
                  "Detecting..."
                ) :
                  conditionsData?.description
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
              <Text fontWeight="500">Communicable</Text>
              <Text border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : conditionsData?.communicable}
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
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData?.symptoms?.map((symptom, index) => (
                    <ListItem key={index}>{symptom}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Causes</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData?.causes?.map((cause, index) => (
                    <ListItem key={index}>{cause}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">Treatment</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                {loading ? "Detecting..." : (<UnorderedList>
                  {conditionsData?.treatment?.map((treatment, index) => (
                    <ListItem key={index}>{treatment}</ListItem>
                  ))}
                </UnorderedList>)}
              </Flex>
            </Flex>
            <Flex
              flexDir="column"
              border="1px solid #e4e6ea"
              p="1rem"
              borderRadius="5px"
              gap="0.5rem"
            >
              <Text fontWeight="500">External Link</Text>
              <Flex border="1px solid #e4e6ea" p="1rem" borderRadius="5px" _hover={{ color: theme.colors.brand.primary_green_dark, textDecoration: "underline" }}>
                <Link to={conditionsData?.link} target="_blank" border="1px solid #e4e6ea" p="1rem" borderRadius="5px">
                  {loading ? "Detecting..." : conditionsData?.link}
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </DashboardWrapper>
  );
};

export default DermaDetection;
