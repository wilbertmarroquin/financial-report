export const mapChildrenValues = (dataList, titleKey, dataKey) => {
  const newChildren = dataList.map((data) => {
    const dataPerMonth = data[dataKey].reduce((childrenObj, currentData) => {
      const newChildrenObj = { ...childrenObj };
      newChildrenObj[currentData.date] = currentData.value;

      return newChildrenObj;
    }, {});

    return {
      [titleKey]: data[titleKey],
      ...dataPerMonth,
    };
  });

  return newChildren;
}

export const getSumByMonth = (data, dataKey) => {
  const sum = data.reduce((acc, dataElement) => {
    const newAcc = {...acc};
    dataElement[dataKey].forEach(element => {
      newAcc[element.date] = (newAcc[element.date] || 0) + element.value;
    });

    return newAcc;
  }, {});

  return sum;
}