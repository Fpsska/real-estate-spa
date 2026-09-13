import React, { useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';

import { useAppSelector } from '../../../app/store/hooks';
import {
    useInputRangeActions,
    INPUT_RANGE_TOTAL,
    PRICE_GAP
} from '../../../features/price-range-filter';

import { scrollToElement } from '../../../shared/lib';

import { ButtonList } from './ButtonList';
import { CheckboxList } from './CheckboxList';

import './filter.scss';

// /. imports

interface propTypes {
    searchValue: string;
    setSearchValue: (value: string) => void;
    projectCount: number;
    projectText: string;
    isDataLoading: boolean;
    isError: boolean;
    isCardsEmpty: boolean;
}

const SUBWAY_REGEXP = /[^a-zA-Z\s]/g;

// /. interfaces

const Filter: React.FC<propTypes> = (props) => {
    const {
        searchValue,
        setSearchValue,
        projectCount,
        projectText,
        isDataLoading,
        isError,
        isCardsEmpty
    } = props;

    const inputRangeMinValue = useAppSelector(
        (state) => state.priceRangeFilter.inputRangeMinValue
    );
    const inputRangeMaxValue = useAppSelector(
        (state) => state.priceRangeFilter.inputRangeMaxValue
    );

    const [inputPriceMinValue, setInputPriceMinValue] = useState<string>('');
    const [inputPriceMaxValue, setInputPriceMaxValue] = useState<string>('');

    const { setCurrentInputRangeMinValue, setCurrentInputRangeMaxValue } =
        useInputRangeActions();

    const scrollTo = scrollToElement();

    // /. hooks

    // progress bar position and price counters are pure derivations of the
    // range values — no need to sync them via an effect
    const progressLeft = `${(inputRangeMinValue / INPUT_RANGE_TOTAL) * 100}%`;
    const progressRight = `${
        100 - (inputRangeMaxValue / INPUT_RANGE_TOTAL) * 100
    }%`;

    const priceMinCounter =
        inputRangeMinValue === 0
            ? +(inputRangeMinValue / 1_000_000).toFixed(0)
            : +(inputRangeMinValue / 1_000_000).toFixed(2);

    const priceMaxCounter =
        inputRangeMaxValue === INPUT_RANGE_TOTAL
            ? +(inputRangeMaxValue / 1_000_000).toFixed(0)
            : +(inputRangeMaxValue / 1_000_000).toFixed(2);

    // /. derived values

    const handleRangeChange = (type: 'min' | 'max', value: number): void => {
        if (type === 'min') {
            setInputPriceMinValue('');
            setCurrentInputRangeMinValue(value);

            if (inputRangeMaxValue - value < PRICE_GAP) {
                setCurrentInputRangeMinValue(inputRangeMaxValue - PRICE_GAP);
            }
        } else {
            setInputPriceMaxValue('');
            setCurrentInputRangeMaxValue(value);

            if (value - inputRangeMinValue < PRICE_GAP) {
                setCurrentInputRangeMaxValue(inputRangeMinValue + PRICE_GAP);
            }
        }
    };

    const clampPrice = (type: 'min' | 'max', rawValue: number): void => {
        if (type === 'min') {
            if (
                inputRangeMaxValue - rawValue >= PRICE_GAP &&
                rawValue <= INPUT_RANGE_TOTAL
            ) {
                setCurrentInputRangeMinValue(rawValue);
            } else if (rawValue > inputRangeMaxValue - PRICE_GAP) {
                setCurrentInputRangeMinValue(inputRangeMaxValue - PRICE_GAP);
            } else if (!rawValue) {
                setCurrentInputRangeMinValue(0);
            }
        } else {
            if (
                rawValue - inputRangeMinValue >= PRICE_GAP &&
                rawValue <= INPUT_RANGE_TOTAL
            ) {
                setCurrentInputRangeMaxValue(rawValue);
            } else if (rawValue >= INPUT_RANGE_TOTAL || !rawValue) {
                setCurrentInputRangeMaxValue(INPUT_RANGE_TOTAL);
            }
        }
    };

    const inputNumMinHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        // MIN NUMBER INPUT
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setInputPriceMinValue(rawValue);
        clampPrice('min', +rawValue);
    };

    const inputNumMaxHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        // MAX NUMBER INPUT
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setInputPriceMaxValue(rawValue);
        clampPrice('max', +rawValue);
    };

    const preventInvalidNumberKey = (
        e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
        if (e.key === 'e') e.preventDefault();
    };

    // /. functions

    return (
        <form
            className="filter"
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="filter__wrapper">
                <fieldset className="filter__group filter__group--layouts">
                    <legend className="filter__legend">Apartment layout</legend>
                    <div className="filter__buttons">
                        <ButtonList
                            isDataLoading={isDataLoading}
                            isError={isError}
                            isCardsEmpty={isCardsEmpty}
                        />
                    </div>
                </fieldset>

                <fieldset className="filter__group filter__group--price">
                    <legend className="filter__legend">Apartment price</legend>
                    <input
                        className="filter__input filter__input--price"
                        value={inputPriceMinValue}
                        onChange={inputNumMinHandler}
                        onKeyDown={preventInvalidNumberKey}
                        type="number"
                        placeholder="Starting price 1,45 million rubles"
                        disabled={isDataLoading || isError || isCardsEmpty}
                    />
                    <input
                        className="filter__input filter__input--price"
                        value={inputPriceMaxValue}
                        onChange={inputNumMaxHandler}
                        onKeyDown={preventInvalidNumberKey}
                        type="number"
                        placeholder="Final price 20 million rubles"
                        disabled={isDataLoading || isError || isCardsEmpty}
                    />
                    <div className="filter__slider">
                        <div className="slider">
                            <div
                                className="slider__progress"
                                style={{
                                    left: progressLeft,
                                    right: progressRight
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="filter__range">
                        <div className="price-range">
                            <div className="price-range__controls">
                                <input
                                    className="price-range__input price-range__input--min"
                                    type="range"
                                    onChange={(e) =>
                                        handleRangeChange(
                                            'min',
                                            +e.target.value
                                        )
                                    }
                                    max={INPUT_RANGE_TOTAL}
                                    value={inputRangeMinValue}
                                    disabled={
                                        isDataLoading || isError || isCardsEmpty
                                    }
                                    min="0"
                                    step="100"
                                />
                                <input
                                    className="price-range__input price-range__input--max"
                                    type="range"
                                    onChange={(e) =>
                                        handleRangeChange(
                                            'max',
                                            +e.target.value
                                        )
                                    }
                                    max={INPUT_RANGE_TOTAL}
                                    value={inputRangeMaxValue}
                                    disabled={
                                        isDataLoading || isError || isCardsEmpty
                                    }
                                    min="0"
                                    step="100"
                                />
                            </div>
                            <div className="price-range__indicators">
                                <span className="price-range__counter price-range__counter--min">{`${priceMinCounter} mil. ₽`}</span>
                                <span className="price-range__counter price-range__counter--max">{`${priceMaxCounter} mil. ₽`}</span>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="filter__group filter__group--rental">
                    <legend className="filter__legend">
                        Apartment rental period
                    </legend>
                    <div className="filter__checkboxes">
                        <CheckboxList
                            isDataLoading={isDataLoading}
                            isError={isError}
                            isCardsEmpty={isCardsEmpty}
                        />
                    </div>
                </fieldset>

                <fieldset className="filter__group filter__group--area">
                    <legend className="filter__legend">Subway area</legend>
                    <input
                        className="filter__input filter__input--area"
                        type="text"
                        placeholder="Subway area"
                        value={searchValue}
                        disabled={isDataLoading || isError}
                        // TODO: FIX
                        onChange={({ target: { value } }) =>
                            setSearchValue(value.replace(SUBWAY_REGEXP, ''))
                        }
                    />
                    <AiOutlineSearch size={18} />
                </fieldset>
            </div>

            <div className="filter__group filter__group--submit">
                <span className="filter__count">{`${projectCount} ${projectText}`}</span>
                <button
                    className="button button--submit"
                    type="button"
                    onClick={() =>
                        scrollTo(document.querySelector('.page__list'))
                    }
                >
                    Show
                </button>
            </div>
        </form>
    );
};

export { Filter };
