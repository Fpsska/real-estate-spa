// TODO: RELOCATE
import { Dispatch, SetStateAction, useState } from 'react';

// /. imports

interface UseFilterProps<T> {
    items: T[];
    filterProp: keyof T;
}

interface UseFilterResult<T> {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
    filteredItems: T[];
}

// /. interfaces

export function useFilter<T>(props: UseFilterProps<T>): UseFilterResult<T> {
    const { items, filterProp } = props;

    const [searchValue, setSearchValue] = useState<string>('');

    const filteredItems = searchValue
        ? items.filter((item) => {
              const itemValue = String(item[filterProp]);
              return RegExp(searchValue.trim(), 'i').test(itemValue);
          })
        : items;

    return {
        searchValue,
        setSearchValue,
        filteredItems
    };
}
