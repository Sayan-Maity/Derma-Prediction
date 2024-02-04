/* eslint-disable prettier/prettier */
import { Flex, Text } from "@chakra-ui/react";
import { convertFromRaw } from "draft-js";

const RenderedContent = ({ rawContentState, author }) => {
    try {
      const contentState = convertFromRaw(JSON.parse(rawContentState));
      const blocks = contentState.getBlocksAsArray();
  
      return (
        <Flex flexDir="column">
          <div>

          {blocks.map((block, index) => {
            const text = block.getText();
            const isBold = block.getInlineStyleAt(0).has('BOLD'); // Check if the first character is bold
            const isEmpty = text.trim() === '';
  
            return (
              <div key={index} style={{ fontWeight: isBold ? 'bold' : 'normal', whiteSpace: 'pre-wrap',  fontStyle: isEmpty ? 'italic' : 'normal', }}>
                {text}
              </div>
            );
          })}
            </div>
          <Flex>
            <Text>By: {author}</Text>
          </Flex>
        </Flex>
      );
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return <div>Error rendering content</div>;
    }
  };
  

export default RenderedContent

