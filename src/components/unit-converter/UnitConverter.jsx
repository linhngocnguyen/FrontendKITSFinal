import { useState } from 'react';
import { Layout, Space, Typography, InputNumber, Select, Button } from 'antd';
import './UnitConverter.css';

const { Title, Text } = Typography;
const { Option } = Select;

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('--Select an unit--');
  const [toUnit, setToUnit] = useState('--Select an unit--');
  const [unitType, setUnitType] = useState('--Select an unit--');

  const convertLength = (value, from, to) => {
    const conversions = {
      meters: 1,
      feet: 0.3048,
      miles: 1609.344,
      kilometers: 1000,
      yards: 0.9144,
      inches: 0.0254
    };
    const fromValue = conversions[from];
    const toValue = conversions[to];
    return value * (fromValue / toValue);
  };

  const convertMass = (value, from, to) => {
    const conversions = {
      kilograms: 1,
      pounds: 0.45359237,
      ounces: 0.0283495231,
      grams: 0.001,
      tons: 1000
    };
    const fromValue = conversions[from];
    const toValue = conversions[to];
    return value * (fromValue / toValue);
  };

  const convertCurrency = (value, from, to) => {
    const exchangeRates = {
      USD: {
        EUR: 0.842,
        GBP: 0.726,
        JPY: 110.80,
        VND: 22760.00
      },
      EUR: {
        USD: 1.187,
        GBP: 0.864,
        JPY: 131.49,
        VND: 26901.54
      },
      GBP: {
        USD: 1.376,
        EUR: 1.157,
        JPY: 152.88,
        VND: 31129.31
      },
      JPY: {
        USD: 0.00903,
        EUR: 0.00760,
        GBP: 0.00652,
        VND: 133.56
      },
      VND: {
        USD: 0.000044,
        EUR: 0.000037,
        GBP: 0.000032,
        JPY: 0.0075
      }
    };
    const rate = exchangeRates[from][to];
    return value * rate;
  };

  const handleInputChange = (value) => {
    setInputValue(value)
  };

  const handleFromUnitChange = (value) => {
    setFromUnit(value);
  };

  const handleToUnitChange = (value) => {
    setToUnit(value);
  };

  const handleUnitTypeChange = (value) => {
    setUnitType(value);
    setFromUnit('');
    setToUnit('');
    setInputValue('');
  };

  const handleUnitReverse = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  let convertedValue;
  if (fromUnit === toUnit) {
    convertedValue = inputValue;
  } else if (unitType === 'length') {
    convertedValue = convertLength(inputValue, fromUnit, toUnit);
  } else if (unitType === 'mass') {
    convertedValue = convertMass(inputValue, fromUnit, toUnit);
  } else if (unitType === 'currency' && fromUnit !== '' && toUnit !== '' && fromUnit !== toUnit) {
    convertedValue = convertCurrency(inputValue, fromUnit, toUnit).toFixed(2);
  }

  let unitOptions;
  if (unitType === 'length') {
    unitOptions = ['--Select an unit--', 'meters', 'feet', 'miles', 'kilometers', 'yards', 'inches'];
  } else if (unitType === 'mass') {
    unitOptions = ['--Select an unit--', 'kilograms', 'pounds', 'ounces', 'grams', 'tons'];
  } else if (unitType === 'currency') {
    unitOptions = ['--Select an unit--', 'USD', 'EUR', 'GBP', 'JPY', 'VND'];
  }

  return (
    <Layout className='unit-converter'>
      <Title level={2}>Unit Converter</Title>
      <Space className='input-container'>
        <Text strong className='input-label'>Input value:</Text>
        <InputNumber min={0} value={inputValue} className='input-number' onChange={handleInputChange} />
      </Space>
      <Space className='unit-type-container'>
        <Text strong className='input-label'>Unit type:</Text>
        <Select value={unitType} onChange={handleUnitTypeChange} className='unit-type-select'>
          <Option value='--Select an unit--' disabled>--Select an unit--</Option>
          <Option value='length'>Length</Option>
          <Option value='mass'>Mass</Option>
          <Option value='currency'>Currency</Option>
        </Select>
      </Space>
      {unitType !== '--Select an unit--' && (
        <>
          <Space className='unit-select-container'>
            <Text strong className='input-label'>From:</Text>
            <Select value={fromUnit} onChange={handleFromUnitChange} className='unit-select'>
              {unitOptions.map((unit) => (
                <Option key={unit} value={unit} disabled={unit === '--Select an unit--'}>{unit}</Option>
              ))}
            </Select>
            <Button type='primary' onClick={handleUnitReverse} className='reverse-button'>↔</Button>
            <Select value={toUnit} onChange={handleToUnitChange} className='unit-select'>
              {unitOptions.map((unit) => (
                <Option key={unit} value={unit} disabled={unit === '--Select an unit--'}>{unit}</Option>
              ))}
            </Select>
          </Space>
          <Text className='converted-value'>{convertedValue > 0 && fromUnit && toUnit ? `${convertedValue} ${toUnit}` : ''} </Text>
        </>
      )}
    </Layout>
  );
};
export default UnitConverter;