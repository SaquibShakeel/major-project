"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Chartcap from "../components/Chartcap";
import { calculatePrice, countItemsOrdered } from "./filterfunctions";

type fooddatatype = [string, number | string][];

export const options = {
  title: "no of Items ordered Chart",
  is3D: true,
};

const Page = () => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [filtertype, setfiltertype] = useState(1);
  const [startDate, setstartDate] = useState<any>(null);
  const [endDate, setendDate] = useState<any>(null);

  const handleSelectChange = (event: any) => {
    setfiltertype(1);
    setSelectedValue(
      event.target.value === "null" ? null : parseInt(event.target.value)
    );
  };

  const [orders, setOrders] = useState([]);
  const prevfooddata: fooddatatype = [["Dish Name", "No of orders"]];
  const prevpricedata: fooddatatype = [["Dish Name", "revenue generated in ₹"]];
  const fillfooddata = () => {
    const itemCounts = countItemsOrdered(orders, selectedValue, filtertype, startDate, endDate);
    for (const [key, value] of itemCounts) {
      prevfooddata.push([key, value]);
    }
    setfooddata(prevfooddata);
  };

  const fillpricedata = () => {
    const itemCounts = calculatePrice(orders, selectedValue, filtertype, startDate, endDate);
    for (const [key, value] of itemCounts) {
      prevpricedata.push([key, value]);
    }
    setpricedata(prevpricedata);
  };
  const [fooddata, setfooddata] = useState<fooddatatype>();

  const [pricedata, setpricedata] = useState<fooddatatype>();

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    if (startDate == null || endDate == null || endDate<startDate) {
      alert("Please enter valid startDate and endDate");
    }
    else{
      setfiltertype(2);
      fillfooddata();
      fillpricedata();
    }
  };

  const handleStartDateChange = (e: any) => {
    setstartDate(e?.target.value);
  };
  const handleEndDateChange = (e: any) => {
    setendDate(e?.target.value);
  };

  useEffect(() => {
    axios.get("/api/admin/order").then((res) => {
      setOrders(res.data.orders);
    });
  }, []);

  useEffect(() => {
    fillfooddata();
    fillpricedata();
  }, [orders, selectedValue]);

  return (
    <div>
      <div
        className="flex flex-col justify-center"
        style={{ alignItems: "center" }}
      >
        <div
          className="selection my-5 mx-5 rounded-md"
          style={{
            display: "inline-block",
            width: "500px",
            backgroundColor: "#F6F5F2",
          }}
        >
          <p className="font-bold text-center">Apply filter</p>
          <div className="container mx-auto">
            <div className="flex justify-center mt-8 mb-4">
              <div className="input-container flex items-center">
                <label htmlFor="time-period" className="mr-4">
                  Select Time Period:
                </label>
                <select
                  id="time-period"
                  className="px-2 py-1 border rounded"
                  value={selectedValue === null ? "null" : selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="null">None</option>
                  <option value="1">This Year</option>
                  <option value="2">This Month</option>
                  <option value="3">Last 7 days</option>
                  <option value="4">Today</option>
                </select>
              </div>
            </div>
            <p className="text-xl text-center py-auto my-auto">or</p>
            <form className="mt-4 flex justify-center content-center">
              <div className="flex items-center">
                <div className="input-container flex flex-col content-center justify-center">
                  <label htmlFor="start-date" className="text-center">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    name="start-date"
                    className="ml-2 px-2 py-1 border rounded"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                <div className="mx-2">to</div>
                <div className="input-container flex flex-col content-center">
                  <label htmlFor="end-date" className="text-center">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    className="px-2 py-1 border rounded"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
              </div>
              <button
                className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white h-10 px-4 border border-blue-500 hover:border-transparent rounded-full"
                onClick={handleFilterSubmit}
              >
                Apply
              </button>
            </form>
          </div>
        </div>
        <p className="font-extrabold underline text-xl my-3 mt-9">
          No of orders
        </p>
        <div className="no-of-orders flex flex-row">
          <div className="food-order mx-10">
            <Chartcap>
              <Chart
                chartType="Bar"
                data={fooddata}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Chartcap>
          </div>
          <div className="food-order mx-10 ">
            <Chartcap>
              <Chart
                chartType="PieChart"
                data={fooddata}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Chartcap>
          </div>
        </div>

        <p className="font-extrabold underline text-xl my-3 mt-9">
          Revenue of dishes
        </p>
        <div className="no-of-orders flex flex-row">
          <div className="food-order mx-10">
            <Chartcap>
              <Chart
                chartType="Bar"
                data={pricedata}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Chartcap>
          </div>
          <div className="food-order mx-10">
            <Chartcap>
              <Chart
                chartType="PieChart"
                data={pricedata}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </Chartcap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
