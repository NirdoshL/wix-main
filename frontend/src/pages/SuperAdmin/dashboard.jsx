import React from "react";
import { FaRegCalendarMinus, FaEllipsisV } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieCharts } from "../../components";

export function Dashboard() {
  const ProjectOverView = [
    { Title: "Server Migration", color: "#F6C23E", occupancy: 50 },
    { Title: "Sales Tracking", color: "#0088FE", occupancy: 60 },
    { Title: "PayOut Details", color: "#00C49F", occupancy: 40 },
    { Title: "Account Setup", color: "#FF8042", occupancy: 80 },
  ];

  const datas = [
    {
      name: "Everest Maya",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Serene",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Terarain",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Rest 1",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Rest 2",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Rest 3",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];
  return (
    <div className="px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px] relative">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer">
          Dashboard
        </h1>

        <button className="bg-[#1cc88a] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px]">
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
              $40,000
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
              $240,000
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
              $240,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
        <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
          <div>
            <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
              PENDING REQUESTS
            </h2>
            <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
              $240,000
            </h1>
          </div>
          <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>
      <div className=" mt-[22px] w-full gap-[30px]">
        <div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[#1cc88a] text-[16px] leading-[19px] font-bold">
              Earnings Overview
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>

          <div className="w-[80%]">
            <LineChart
              width={1000}
              height={500}
              data={datas}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
        <div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
            <h2 className="text-[#1cc88a] text-[16px] leading-[19px] font-bold">
              Revenue Resources
            </h2>
            <FaEllipsisV color="gray" className="cursor-pointer" />
          </div>
          <div className="pl-[35px]">
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
            <div>
              {
                //provide error
              }
              <img src={""} alt="" className="transform scale-[135%]" />
              <p className="mt-[15px] text-semibold text-gray-500">
                No data available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
