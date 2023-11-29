import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import UserService from "services/UserService";
import NumberService from 'services/NumberService';

const debounceTimeout = 800

async function fetchUserList(searchValue, props) {
  searchValue = searchValue.trim()
  if (props.isNumberPage && searchValue.startsWith("+", 0)) {
    if (searchValue.length === 1) {
      return
    } else {
      searchValue = searchValue.replace("+", "")
    }
  }
  if (props.isNumberPage && /^[\d]+$/.test(searchValue)) {
    let numberValue = encodeURIComponent(searchValue);
    let body = await NumberService.searchNumberLog(numberValue)
    let users = body.data.map((user) => (
      {
        label: user.number,
        value: user.userId,
      }
    ));
    return users;
  } else if (searchValue) {
    var body = [];
    let userValue = encodeURIComponent(searchValue);
    body = await UserService.serach(userValue)
    let users = body.data.map((user) => ({
      label: user.fullName !== undefined ? user.fullName + " " + user.email : user.email,
      value: user._id,
    }));
    return users;
  }
}

const SearchBox = (props) => {
  const [email, setEmail] = useState();
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const fetchOptions = (searchValue) => fetchUserList(searchValue, props)
  const loadOptions = (searchValue) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setOptions([]);
    if (props.debounceLoadingFunc) props.debounceLoadingFunc(true);
    setFetching(true);
    fetchOptions(searchValue, props).then((newOptions) => {
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }
      setOptions(newOptions);
      setFetching(false);
      if (props.debounceLoadingFunc) props.debounceLoadingFunc(false);
    });
  };
  const debounceFetcher = useMemo(() => debounce(loadOptions, debounceTimeout), [fetchOptions, debounceTimeout]);

  useEffect(() => {
    if (props.searchUser) {
      setOptions([{ label: props.searchUser.fullName + ' ' + props.searchUser.email, value: props.searchUser._id }]);
      setEmail(props.searchUser.fullName + ' ' + props.searchUser.email);
    }
  }, [props.searchUser]);

  return (
    <Select
      showSearch
      bordered
      style={{ minWidth: props.minWidth || "" }}
      value={email}
      allowClear
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      placeholder={props.placeholder || ""}
      onChange={async (newValue) => {
        setEmail(newValue?.label || "");
        if (newValue?.label.startsWith("+", 0) && newValue.label.length > 1) {
          newValue.key = newValue.label.replace("+", "")
        }
        props.func(newValue?.key || "")
      }}
      options={options}
    />
  );
};
export default SearchBox;