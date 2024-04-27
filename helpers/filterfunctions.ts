const moment = require('moment-timezone');

function countItemsOrdered(
  orders: any[],
  selectedValue: Number | null,
  filtertype: Number,
  startDate: any,
  endDate: any
): Map<string, number> {
  const itemCountMap = new Map<string, number>();
  const currentDate = new Date();

  if (filtertype === 1) {
    for (const order of orders) {
      const orderDate = new Date(order.timestamp);
      // Filter orders based on the selected time period
      if (
        selectedValue === 1 &&
        orderDate.getFullYear() !== currentDate.getFullYear()
      ) {
        continue;
      } else if (
        selectedValue === 2 &&
        (orderDate.getFullYear() !== currentDate.getFullYear() ||
          orderDate.getMonth() !== currentDate.getMonth())
      ) {
        continue;
      } else if (
        selectedValue === 3 &&
        (orderDate.getFullYear() !== currentDate.getFullYear() ||
          orderDate.getDate() + 7 < currentDate.getDate())
      ) {
        continue;
      } else if (
        selectedValue == 4 &&
        (orderDate.getFullYear() !== currentDate.getFullYear() ||
          orderDate.getMonth() !== currentDate.getMonth() ||
          orderDate.getDate() !== currentDate.getDate())
      ) {
        continue;
      }

      for (const item of order.items) {
        const itemCount = itemCountMap.get(item.name) || 0;
        itemCountMap.set(item.name, itemCount + item.quantity);
      }
    }
  } else {
    console.log(startDate+" "+endDate)
    for (const order of orders) {
      const orderDate = new Date(order.timestamp);
      console.log("order date is "+orderDate);
      const formattedDate = moment(orderDate).tz('Asia/Kolkata').format('YYYY-MM-DD');

      console.log("order date is "+formattedDate);
      
      if (formattedDate >= startDate && formattedDate <= endDate) {
        console.log("true");
        for (const item of order.items) {
          const itemCount = itemCountMap.get(item.name) || 0;
          itemCountMap.set(item.name, itemCount + item.quantity);
        }
      }
    }
  }

  return itemCountMap;
}

function calculatePrice(
  orders: any[],
  selectedValue: Number | null,
  filtertype: Number,
  startDate: any,
  endDate: any
): Map<string, number> {
  console.log(orders);
  const priceMap = new Map<string, number>();
  const currentDate = new Date();

  if (filtertype === 1) {
    for (const order of orders) {
      const orderDate = new Date(order.timestamp);
      if (
        selectedValue === 1 &&
        orderDate.getFullYear() !== currentDate.getFullYear()
      ) {
        continue;
      } else if (
        selectedValue === 2 &&
        (orderDate.getFullYear() !== currentDate.getFullYear() ||
          orderDate.getMonth() !== currentDate.getMonth())
      ) {
        continue;
      } else if (
        selectedValue == 4 &&
        (orderDate.getFullYear() !== currentDate.getFullYear() ||
          orderDate.getMonth() !== currentDate.getMonth() ||
          orderDate.getDate() !== currentDate.getDate())
      ) {
        continue;
      }

      for (const item of order.items) {
        const prevPrice = priceMap.get(item.name) || 0;
        priceMap.set(item.name, prevPrice + item.quantity * item.price);
      }
    }
  }
  else{
    for(const order of orders){
      const orderDate = new Date(order.timestamp);
      const formattedDate = moment(orderDate).tz('Asia/Kolkata').format('YYYY-MM-DD');

      if(formattedDate>=startDate&&formattedDate<=endDate){
        console.log("true");
        for (const item of order.items) {
          const prevPrice = priceMap.get(item.name) || 0;
          priceMap.set(item.name, prevPrice + item.quantity * item.price);
        }
      }
    }
  }
  return priceMap;
}

export { countItemsOrdered, calculatePrice };
