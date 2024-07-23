
import { Flex, Select, Button, useToast, Text, UnorderedList, ListItem, useTheme } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const Page4 = () => {
  const theme = useTheme();
  const toast = useToast();
  const [skinType, setSkinType] = useState("");
  const [skinConcern, setSkinConcern] = useState("");
  const [recommendedData, setRecommendedData] = useState({})
  const [loading, setLoading] = useState(false);

  const handleSelectSkinType = (e) => {
    setSkinType(e.target.value);
  };
  const handleSelectSkinConcern = (e) => {
    setSkinConcern(e.target.value);
  };

  const handleOpenAIApiCall = async () => {
    setLoading(true);
    if (!skinType || !skinConcern) {
      setLoading(false);
      if (!skinType) {
        toast({
          title: "Please select your Skin Type",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
      else if (!skinConcern) {
        toast({
          title: "Please select your Skin Concern",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
      return;

    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/recommendationPrompt`,
        {
          skinType: skinType,
          skinConcern: skinConcern,
        }
      );
      if (response.status === 200) {
        setLoading(false);
        toast({
          title: "Recommendation Generated Successfully",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });

        console.log(response);
        const recommendedData = jsonParser(response.data);
        setRecommendedData(recommendedData)
      }
    } catch (error) {
      setLoading(false);
      toast({
          title: "Sorry, couldn't generate recommendation",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
    }
  };

  const jsonParser = (response) => {
    try {
      if (response && response.content) {
        // const jsonRegex = /```json\s*([\s\S]+)\s*```/;
        const jsonRegex = /```json\n([\s\S]+)\n```/;
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
    <Flex p="2rem"
      alignItems="flex-start"
      justifyContent="center"
      margin="auto"
      color="#74809A" maxH="100vh" >
      <Flex width="1200px" alignItems="flex-start" h="90vh" maxH="100vh" gap="2rem">
        <Flex width="40%" flexDir="column" gap="1rem" h="90vh" pr="1rem" borderRight="1px solid #333">
          <Select
            placeholder="Select your skin type"
            value={skinType}
            onChange={handleSelectSkinType}
            cursor="pointer"
            _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }}
          >
            <option value="Normal">Normal</option>
            <option value="Oily">Oily</option>
            <option value="Dry">Dry</option>
            <option value="Combination">Combination</option>
            <option value="Sensitive">Sensitive</option>
          </Select>
          <Select
            placeholder="Select your skin concern"
            value={skinConcern}
            onChange={handleSelectSkinConcern}
            cursor="pointer"
            _focus={{ border: `1px solid ${theme.colors.brand.primary_green_dark}` }}
          >
            <option value="Acne">Acne</option>
            <option value="Wrinkles and fine lines">Wrinkles and fine lines</option>
            <option value="Dark spots or hyperpigmentation">Dark spots or hyperpigmentation</option>
            <option value="Redness or rosacea">Redness or rosacea</option>
            <option value="Dryness or dehydration">Dryness or dehydration</option>
            <option value="Sensitivity or irritation">Sensitivity or irritation</option>
          </Select>
          <Button onClick={handleOpenAIApiCall} isLoading={loading} loadingText="Recommending..." backgroundColor={theme.colors.brand.primary_green_dark} border="2px solid transparent" _hover={{
            backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
            color: `${theme.colors.button.hover_light_color}`,
            border: `${theme.colors.button.hover_light_border}`
          }} variant="unstyled" p="1.5rem" display="flex" color="#fff" borderRadius="30px">Recommend</Button>
        </Flex>


        <Flex color="#333" width="100%" maxH="100vh" h="90vh" overflowY="scroll" alignItems="flex-start" justifyContent="flex-start" p="0 1rem">
          {recommendedData?.skinType !== "" && (
            <Flex flexDir="column">
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Skin Type</strong></Text>
                <Text width="100%">{recommendedData?.skinType}</Text>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Skin Concerns</strong></Text>
                <Text width="100%">{recommendedData?.skinConcerns}</Text>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Description</strong></Text>
                <Text width="100%">{recommendedData?.description}</Text>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Specialized Treatment</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {recommendedData?.specializedTreatment?.map((specializedTreatment, index) => (
                      <ListItem key={index}>{specializedTreatment}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Daily Routine</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {recommendedData?.dailyRoutine?.map((dailyRoutine, index) => (
                      <ListItem key={index}>{dailyRoutine}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Weekly Routine</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {recommendedData?.weeklyRoutine?.map((weeklyRoutine, index) => (
                      <ListItem key={index}>{weeklyRoutine}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Hydration And Diet</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {recommendedData?.hydrationAndDiet?.map((hydrationAndDiet, index) => (
                      <ListItem key={index}>{hydrationAndDiet}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>
              <Flex gap="1rem" p="1rem">
                <Text width="10rem" backgroundColor={theme.colors.brand.primary_blue_light} height="fit-content" p="0.5rem 2rem" borderRadius="5px"><strong>Advice</strong></Text>
                <Flex width="100%">
                  <UnorderedList>
                    {recommendedData?.advice?.map((advice, index) => (
                      <ListItem key={index}>{advice}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex>
              </Flex>

            </Flex>
          )}
          <Flex height="90vh" alignItems="center" width="70%" justifyContent="center">

            {recommendedData?.skinType?.length === 0 && (<Flex><Text>{loading ? `😃 Fetching all the Skin Care Routine for ${skinType} skin type and ${skinConcern} skin concern` : "👋 Please select your skin type and skin concern!"}</Text></Flex>)}
          </Flex>
        </Flex>

        {/* ------------------------------------------------------------------ */}


      </Flex>
    </Flex>
  );
};

export default Page4;
