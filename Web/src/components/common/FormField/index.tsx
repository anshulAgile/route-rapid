import React, { FC } from 'react';

import { ArrowDownOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Form, Input, Select, Space, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { PatternFormat } from 'react-number-format';

import { capitalizeFirstLetter } from '../../../utils/functions';

import { DownArrow } from '../../../components/svg';

import {
  IRenderCheckBox,
  IRenderCheckboxProps,
  IRenderInputProps,
  IRenderSelectProps
} from './types';

export const RenderTextInput = (props: IRenderInputProps) => {
  const {
    // COLUMN
    col,
    colClassName,
    colOffSet,
    offSetPull,
    // FORM_ITEM
    name,
    label,
    rules,
    help,
    // FORM_INPUT
    type,
    placeholder,
    value,
    disabled,
    min,
    max,
    minLength,
    maxLength,
    onChange,
    className,
    addonAfter,
    addonBefore,
    suffix,
    prefix,
    allowClear,
    required,
    size,
    tooltip,
    normalize,
    onClick
  } = props;
  const isOnInput = type !== 'number' && type !== 'email' && type !== 'url';
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isOnInput) {
      event.target.value = capitalizeFirstLetter(event.target.value);
    }
    // Call the onChange prop if it's provided
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules}
        help={help ?? null}
        required={required}
        tooltip={tooltip}
        normalize={normalize}
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          className={`input-field ${className}`}
          addonAfter={addonAfter ?? null}
          addonBefore={addonBefore ?? null}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          size={size ?? 'middle'}
          onClick={onClick}
          {...(isOnInput && { onInput: handleInput })}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPasswordInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  placeholder,
  prefix,
  offSetPull,
  required
}: IRenderInputProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
      pull={offSetPull}
    >
      <Form.Item
        name={name ?? ''}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={label}
        rules={rules || null}
        required={required}
      >
        <Input.Password
          placeholder={placeholder}
          size="large"
          iconRender={(visible) =>
            visible ? (
              <EyeFilled twoToneColor={'#B7C8CB'} />
            ) : (
              <EyeInvisibleFilled twoToneColor={'#B7C8CB'} />
            )
          }
          prefix={prefix ?? null}
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible
          }}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderCheckBox = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  checked,
  className,
  children,
  value,
  initialValue,
  defaultChecked
}: IRenderCheckBox) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        name={name}
        label={label}
        rules={rules}
        required={required}
        initialValue={initialValue}
      >
        <Checkbox
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className={className}
        >
          {children}
        </Checkbox>
      </Form.Item>
    </Col>
  );
};

export const RenderCheckboxGroup = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  checkboxName,
  onChange,
  value,
  className,
  optionLabel,
  disabled,
  defaultValues
}: IRenderCheckboxProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        required={required}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Checkbox.Group
          defaultValue={defaultValues}
          name={checkboxName}
          onChange={onChange}
          value={value}
          className={className}
          disabled={disabled}
        >
          {optionLabel?.map((item: any) => (
            <Checkbox value={item.value} key={item._id}>
              {item.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>
    </Col>
  );
};

export const RenderSelectInput = ({
  col,
  colClassName,
  colOffSet,
  name,
  label,
  rules,
  required,
  onChange,
  value,
  className = '',
  optionLabel,
  disabled,
  onSelect,
  showSearch,
  // selectOption,
  mode,
  placeholder,
  allowClear,
  defaultValue,
  prefixIcon = <DownArrow />,
  suffixIcon
}: IRenderSelectProps) => {
  return (
    <Col
      xs={col?.xs}
      sm={col?.sm}
      md={col?.md ? col?.md : col}
      lg={col?.lg}
      xl={col?.xl}
      xxl={col?.xxl}
      className={colClassName ?? ''}
      offset={colOffSet}
    >
      <div className={`customSelect ${prefixIcon && 'selectWithIcon'} ${className ?? className}`}>
        <Form.Item
          name={name}
          label={label}
          rules={rules}
          required={required}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            value={value}
            // options={selectOption}
            onSelect={onSelect}
            showSearch={showSearch}
            mode={mode}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            defaultValue={defaultValue}
            onChange={onChange}
            optionFilterProp="children"
            suffixIcon={
              <div className="selectIcons">
                {prefixIcon ? (
                  <span className="prefixIcon">{prefixIcon}</span>
                ) : (
                  <span className="selectArrowIcon">{suffixIcon || <ArrowDownOutlined />}</span>
                )}
              </div>
            }
          >
            {optionLabel?.map((item: any) => (
              <Select.Option key={item.id} value={item.id} label={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Col>
  );
};

export const RenderTextArea = (props: any) => {
  return (
    <Col {...props.col}>
      <Form.Item
        name={props.name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        rules={props.rules}
        tooltip={props.tooltip}
      >
        <TextArea
          showCount={props.showCount}
          disabled={props.disabled}
          className={props.className}
          cols={props.cols}
          rows={props.rows}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          minLength={props.minLength}
          allowClear={props.allowClear}
          onInput={(event: any) => (event.target.value = capitalizeFirstLetter(event.target.value))}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderDatePicker = (props: any) => {
  return (
    <Col {...props.col}>
      <Form.Item
        name={props.name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        rules={props.rules}
      >
        <DatePicker
          placeholder={props.placeholder}
          suffixIcon={props.suffixIcon}
          format={{
            format: props.format,
            type: 'mask'
          }}
          minDate={dayjs(props.minDate, props.format)}
          onChange={props.onChange}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderTimePicker = (props: any) => {
  return (
    <Col {...props.col}>
      <Form.Item
        name={props.name}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={props.label}
        rules={props.rules}
      >
        <TimePicker
          placeholder={props.placeholder}
          use12Hours={props.use12Hours}
          format={props.format}
          onChange={props.onChange}
        />
      </Form.Item>
    </Col>
  );
};

export const RenderPhoneNumber: FC<any> = ({
  col,
  colClassName,
  colOffSet,
  offSetPull,
  name,
  label,
  rules,
  help,
  required,
  hidden,
  placeholder,
  value,
  onChange,
  validateStatus,
  defaultValue,
  format,
  disabled
}) => {
  const colProps = {
    xs: col?.xs,
    sm: col?.sm,
    md: col?.md ? col?.md : col,
    lg: col?.lg,
    xl: col?.xl,
    xxl: col?.xxl,
    className: colClassName ?? '',
    offset: colOffSet,
    pull: offSetPull
  };

  const formItemProps = {
    hidden: hidden,
    name: name ?? '',
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
    label: label,
    rules: rules,
    help: help ?? null,
    initialValue: value,
    required: required,
    validateStatus: validateStatus
  };
  return (
    <Col {...colProps}>
      <Form.Item {...formItemProps} className={`phoneNumberInput inputWithPrefix`}>
        <Space.Compact block style={{ alignItems: 'center' }}>
          <PatternFormat
            name={formItemProps.name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            format={format ?? '(###) ###-####'}
            mask="_"
            defaultValue={defaultValue}
            disabled={disabled}
          />
        </Space.Compact>
      </Form.Item>
    </Col>
  );
};
