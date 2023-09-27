import React, { useEffect, useState } from "react";
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa";
import { BsFilePersonFill } from "react-icons/bs";
import { PieCharts } from "../../components";
import { employeeData } from "../../function/employee";
import { toast } from "react-toastify";
import { fetchOrder } from "../../function/fetchOrder";
import Spinner from "../../components/spinner";

export function Dashboard() {
  const timeStamp = Date.now();
  const date = new Date(timeStamp);
  const full_date = parseInt(
    `${date.getFullYear().toString()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`
  );
  const [data, setData] = useState();
  const [monthdata, setMonthData] = useState(0);
  const [yeardata, setYearData] = useState(0);
  const [order, setOrder] = useState(0);
  const [ShowLoader, setShowLoader] = useState(true);
  const generateReport = () => {
    window.print();
  };

  useEffect(() => {
    let sum = 0;
    let monthsum = 0;
    let yearsum = 0;
    async function fetchDataAsync() {
      try {
        const responseData = await employeeData();
        const responseDatas = await fetchOrder();
        setData(responseData);

        responseDatas.data.map((item) => {
          setOrder((sum += parseInt(item.total) / 100));
          return null;
        });

        const monthlyData = await responseDatas.data.filter(
          (item) =>
            full_date -
              parseInt(item.createdAt.split("T")[0].replace(/-/g, "")) <=
            30
        );

        const yearlyData = await responseDatas.data.filter(
          (item) =>
            full_date -
              parseInt(item.createdAt.split("T")[0].replace(/-/g, "")) <=
            365
        );
        monthlyData.map((item) => {
          setMonthData((monthsum += parseInt(item.total) / 100));
          return null;
        });
        yearlyData.map((item) => {
          setYearData((yearsum += parseInt(item.total) / 100));
          return null;
        });
        setShowLoader(false);
      } catch (error) {
        setShowLoader(false);
        toast.error(`Error fetching data: ${error}`);
      }
    }

    fetchDataAsync();
  }, [full_date]);

  const ProjectOverView = [
    { Title: "Server Migration", color: "#F6C23E", occupancy: 50 },
    { Title: "Sales Tracking", color: "#0088FE", occupancy: 60 },
    { Title: "PayOut Details", color: "#00C49F", occupancy: 40 },
    { Title: "Account Setup", color: "#FF8042", occupancy: 80 },
  ];

  return ShowLoader ? (
    <Spinner />
  ) : (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px] relative">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Dashboard
        </h1>

        <button
          onClick={generateReport}
          className="bg-[#1cc88a] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]"
        >
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
              EARNINGS (MONTHLY)
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              ${monthdata ? monthdata : <p>Loading...</p>}
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color="" />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              EARNINGS (ANNUAL)
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              ${yeardata ? yeardata : <p>Loading...</p>}
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              TOTAL{" "}
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              {order ? `$${order}` : <p>Loading...</p>}
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              USERS
            </h2>
            {data && (
              <>
                <p className="mt-[4px] text-bold text-gray-500">
                  Total:{" "}
                  <span className="text-green-500 cursor-pointer">
                    {data.users.length}
                  </span>
                </p>
                <p className="mt-[4px] text-bold text-gray-500">
                  Active:{" "}
                  <span className="text-green-500 cursor-pointer">
                    {data.users.filter((user) => user.isLogged).length}
                  </span>
                </p>
                <p className="mt-[4px] text-bold text-gray-500">
                  Verified:{" "}
                  <span className="text-green-500 cursor-pointer">
                    {data.users.filter((user) => user.isverified).length}
                  </span>
                </p>
              </>
            )}
          </div>
          <BsFilePersonFill fontSize={28} />
        </div>
      </div>
      <div className=" mt-[22px] w-full gap-[30px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]"></div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#1cc88a] text-[16px] leading-[19px] font-bold">
              Revenue Resources
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className=" flex justify-center pl-[35px]">
            <PieCharts />
            {}
          </div>
        </div>
      </div>
      <div className="flex mt-[22px] w-full gap-[30px]">
        <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#1cc88a] text-[16px] leading-[19px] font-bold">
              Projects Overview
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="px-[25px] space-y-[15px] py-[15px]">
            {ProjectOverView.map((project) => (
              <div key={project.Title} className="flex items-center">
                <p className="w-1/3">{project.Title}</p>
                <div className="w-2/3 bg-gray-200 rounded overflow-hidden">
                  <div
                    style={{
                      width: `${project.occupancy}%`,
                      backgroundColor: project.color,
                    }}
                    className="h-4"
                  ></div>
                </div>
                <p>{project.occupancy}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="basis-[45%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#1cc88a] text-[16px] leading-[19px] font-bold">
              {" "}
              Resources
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px] flex items-center justify-center h-[100%]">
            {data && (
              <div>
                <p className="mt-[15px] text-semibold text-gray-500">
                  Total Users: {data.users.length}
                </p>
                <p className="mt-[15px] text-semibold text-gray-500">
                  Total Logged Users:{" "}
                  {data.users.filter((user) => user.isLogged).length}
                </p>
                <p className="mt-[15px] text-semibold text-gray-500">
                  Total Verified Users: {order}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
