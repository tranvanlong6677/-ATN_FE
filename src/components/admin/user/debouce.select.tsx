import React, { useEffect, useMemo, useRef, useState } from "react";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import debounce from "lodash/debounce";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
  disabled?: boolean;
  // value?: ValueType | ValueType[] | null;
}

export function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  disabled = false,
  ...props
}: DebounceSelectProps<ValueType>) {
  // const [dataValue, setDataValue] = useState<ValueType>();
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const handleOnFocus = () => {
    //fetching init data when focus to input
    if (options && options.length > 0) {
      return;
    }
    fetchOptions("").then((newOptions) => {
      setOptions([...options, ...newOptions]);
    });
  };

  const handleOnBlur = () => {
    setOptions([]);
  };
  // useEffect(() => {
  //   setDataValue(value as ValueType);
  // }, [value]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      value={props.value}
      // onChange={props.onChange}
      // onChange={(e: any) => {
      //   console.log("adfafasdf", e);
      //   setDataValue(e);
      // }}
      disabled={disabled}
    />
  );
}
