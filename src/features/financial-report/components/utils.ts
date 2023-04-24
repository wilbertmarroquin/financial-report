import { CommonData, IterableCommonDataKeys, SumByMonth } from '../types';

type KeyOfData = keyof CommonData;

type MapChildren = {
  [key: string]: string | number;
};

/**
 * Function to create the children structure to use in table whe use the dates as keys to simplify the map in table example:
 * {
 *   'customTitleKey': "Example",
 *    key: 'Example',
 *   '10/2022': 19283,
 *   '11/2022': -21282
 * }
 * @param dataList Array of data that come to be proccess
 * @param titleKey Key of the data list that is used as title
 * @param dataKey List key that is used to create the structure
 * @returns Children structure
 */
export const mapChildrenValues = (
  dataList: CommonData[],
  titleKey: KeyOfData,
  dataKey: IterableCommonDataKeys
) => {
  const newChildren = dataList.map((data: CommonData) => {
    const dataPerMonth = data[dataKey]?.reduce((childrenObj, currentData) => {
      const newChildrenObj: MapChildren = { ...childrenObj };
      newChildrenObj[currentData.date] = currentData.value;

      return newChildrenObj;
    }, {} as MapChildren);

    return {
      [titleKey]: data[titleKey],
      key: data[titleKey],
      ...dataPerMonth,
    };
  });

  return newChildren;
};

/**
 * Function to calculate accumulate value by month keys exmaple:
 * {
 *   '10/2022': 19283,
 *   '11/2022': -21282
 * }
 * @param data Array of data that come to be proccess
 * @param dataKey List Key that is use to create the structure
 * @returns Sum of months values in format.
 */
export const getSumByMonth = (
  data: CommonData[],
  dataKey: IterableCommonDataKeys
) => {
  const sum = data.reduce((acc, dataElement) => {
    const newAcc = { ...acc };
    dataElement[dataKey]?.forEach((element) => {
      newAcc[element.date] = (newAcc[element.date] || 0) + element.value;
    });

    return newAcc;
  }, {} as SumByMonth);

  return sum;
};
