import { Line } from 'react-chartjs-2';
import { IconStar } from "../../assets/svgs/Icons";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper";
import { useQueryGetDietData, useQueryGetLifeStyleData, useQueryGetSkinCareData, useQueryGetWaterIntakeData } from "../../hooks/queryHooks/user-dashboard";
import { Button, Flex, HStack, Heading, Text, VStack, useTheme } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { SkinTipItems } from "../../constants/SkinTipItems";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,

} from 'chart.js';
ChartJS.register(LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineElement,
  Title);

const Dashboard = () => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState(SkinTipItems[0]);
  const [lifeStyleData, setLifeStyleData] = useState([])
  const [waterIntakeData, setWaterIntakeData] = useState([])
  const [dietData, setDietData] = useState([])
  const [skinCareData, setSkinCareData] = useState([])

  useEffect(() => {
    // Set up an interval to update the displayed string every 12 hours
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SkinTipItems.length);
    }, 24 * 60 * 60 * 1000);

    return () => {
      // Clean up the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Update the currentString whenever currentIndex changes
    setCurrentString(SkinTipItems[currentIndex]);
  }, [currentIndex]);

  const { LifeStyleData } = useQueryGetLifeStyleData();
  const { WaterIntakeData } = useQueryGetWaterIntakeData();
  const { DietData } = useQueryGetDietData();
  const { SkinCareData } = useQueryGetSkinCareData();

  useEffect(() => {
    const lifeStyleData = LifeStyleData?.data?.data; // LifeStyleData
    setLifeStyleData(lifeStyleData);

    const waterIntakeData = WaterIntakeData?.data?.data; // WaterIntakeData
    setWaterIntakeData(waterIntakeData);

    const dietData = DietData?.data?.data; // DietData
    setDietData(dietData);

    const skinCareData = SkinCareData?.data?.data; // SkinCareData
    setSkinCareData(skinCareData);

  }, [WaterIntakeData, LifeStyleData, DietData, SkinCareData]);

  console.log("Skincare data =>", skinCareData);


  const jsonData = {
    labels: lifeStyleData?.map((data) => data.date),
    datasets: [
      {
        label: "Sleep",
        data: lifeStyleData?.map((data) => data.sleep),
        borderWidth: 2,
        backgroundColor: "#3ce2ad",
        borderColor: '#3ce2ad',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Exercise",
        data: lifeStyleData?.map((data) => data.exercise),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Sunlight Exposure",
        data: lifeStyleData?.map((data) => data.sunlight),
        borderWidth: 2,
        backgroundColor: "red",
        borderColor: 'red',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Time (hours)',
        },
        min: 0,
        max: 10
      },
    },
  };


  const jsonData2 = {
    labels: waterIntakeData?.map((data) => data.date),
    datasets: [
      {
        label: "Water",
        data: waterIntakeData?.map((data) => data.water),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options2 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Water (Litres)',
        },
        min: 0,
        max: 5
      },
    },
  };

  const jsonData3 = {
    labels: dietData?.map((data) => data.date),
    datasets: [
      {
        label: "Fruit",
        data: dietData?.map((data) => data.fruit),
        borderWidth: 2,
        backgroundColor: "#3ce2ad",
        borderColor: '#3ce2ad',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Vegetable",
        data: dietData?.map((data) => data.vegetable),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Meat",
        data: dietData?.map((data) => data.meat),
        borderWidth: 2,
        backgroundColor: "red",
        borderColor: 'red',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options3 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Food Comsumption (boolean)',
        },
        min: 0,
        max: 1
      },
    },
  };
  const jsonData4 = {
    labels: dietData?.map((data) => data.date),
    datasets: [
      {
        label: "Cleanser",
        data: dietData?.map((data) => data.cleanser),
        borderWidth: 2,
        backgroundColor: "#3ce2ad",
        borderColor: '#3ce2ad',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Toner",
        data: dietData?.map((data) => data.toner),
        borderWidth: 2,
        backgroundColor: "#0078aa",
        borderColor: '#0078aa',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
      {
        label: "Moisturizer",
        data: dietData?.map((data) => data.toner),
        borderWidth: 2,
        backgroundColor: "red",
        borderColor: 'red',
        fill: false,
        tension: 0.8, //curve
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  const options4 = {
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Skin Care Done (boolean)',
        },
        min: 0,
        max: 1
      },
    },
  };

  return (
    <DashboardWrapper>
      <Flex gap="2rem" width="1200px" alignItems="flex-start" flexDir="column">
        <Heading fontSize="2rem"> Your Dashboard </Heading>
        <Flex flexDir="column" border="1px solid #74809a" p="1rem 2rem" borderRadius="5px">
          <HStack >
            <IconStar
              width={"1.5rem"}
              height={"1.5rem"}
              colorStroke={"#3ce2ad"}
            />
            <Text fontSize="1.2rem" fontWeight={"bold"} color={theme.colors.brand.primary_green_dark}>Tip of the day</Text>
          </HStack>
          <Text>{currentString.title} :</Text>
          <Text>{currentString.description}</Text>
        </Flex>

        <Flex w="100%" >
          {lifeStyleData?.length > 0 || waterIntakeData?.length > 0 ? (
            <VStack w="100%" gap="1rem">
              <HStack w="100%">
                {/* ---------  Lifestyle Graph  -------- */}
                {lifeStyleData?.length > 0 && (
                  <Flex w="50%" h="30rem" >
                    <Line ref={canvasRef} data={jsonData} options={options} height="30rem" width="100%" />
                  </Flex>
                )}

                {/* ---------  Water Intake Graph  -------- */}
                {waterIntakeData?.length > 0 && (
                  <Flex w="50%" h="30rem" >
                    <Line ref={canvasRef} data={jsonData2} options={options2} height="30rem" width="100%" />
                  </Flex>
                )}
              </HStack>
              <HStack w="100%">
                {/* ---------  Diet Graph  -------- */}
                {dietData?.length > 0 && (
                  <Flex w="50%" h="30rem" >
                    <Line ref={canvasRef} data={jsonData3} options={options3} height="30rem" width="100%" />
                  </Flex>
                )}

                {/* ---------  Skin Care Graph  -------- */}
                {skinCareData?.length > 0 && (
                  <Flex w="50%" h="30rem" >
                    <Line ref={canvasRef} data={jsonData4} options={options4} height="30rem" width="100%" />
                  </Flex>
                )}

              </HStack>
            </VStack>
          ) : (
            <HStack alignItems="flex-start" justifyContent="flex-start">
              <Text>Want to check your daily Skin Care analytics ?</Text>
              <Text color={theme.colors.brand.primary_green_dark} _hover={{ textDecoration: "underline" }}>
                <Link to="/private/health-analytics" >Click here</Link>
              </Text>

            </HStack>
          )}

        </Flex>

      </Flex>
    </DashboardWrapper>
  );
};

export default Dashboard;
