import { Input, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';
import InvoiceService from "services/InvoiceService";
import CustomersService from "services/CustomersService";

const debounceTimeout = 800

async function fetchUserList(searchValue, props) {
  let userId = searchValue.target.value;
  let filttervalue = props && props.filtterValue;
  let userValue = { userId: encodeURIComponent(userId) };
  var body;
  if (props.changeUrl) {
    body = await CustomersService.getCustomersList(userValue, filttervalue);
  } else {
    body = await InvoiceService.getInvoiceList(userValue, filttervalue)
  }
  props.func(body.data, userId);
}

const SearchBox = (props) => {
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);
  const fetchOptions = (searchValue) => fetchUserList(searchValue, props)
  const loadOptions = (searchValue) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setFetching(true);
    fetchOptions(searchValue, props).then((newOptions) => {
      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }
      setFetching(false);
    });
  };
  const debounceFetcher = useMemo(() => debounce(loadOptions, debounceTimeout), [fetchOptions, debounceTimeout]);

  return (
    <Input
      style={{ minWidth: "280px" }}
      allowClear
      labelInValue
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      placeholder={"Search email"}
      onChange={debounceFetcher}
    />
  );
};
export default SearchBox;