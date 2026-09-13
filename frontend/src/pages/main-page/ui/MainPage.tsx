// import { useAppSelector } from '../../../app/store/hooks';

import {
    type Icards,
    // useCardsActions,
    useGetCardTemplatesQuery
} from '../../../entities/cards';

import { useFilter, declinateByNum } from '../../../shared/lib';
import { Banner, Preloader, ButtonRefresh } from '../../../shared/ui';

import { Filter } from '../../../widgets/filter-panel';
import { CardList } from '../../../widgets/card-list';

import './mainPage.scss';

// /. imports

const INIT_CARDS: Icards[] = [];

const MainPage = () => {
    // const activeCardId = useAppSelector((state) => state.card.activeCardId);

    const {
        data = INIT_CARDS,
        isFetching,
        isError,
        refetch
    } = useGetCardTemplatesQuery();

    const { searchValue, setSearchValue, filteredItems } = useFilter({
        items: data,
        filterProp: 'subwayName'
    });

    // /. hooks

    const isCardsEmpty = !data.length || !filteredItems.length;
    const projectCount = filteredItems.length;
    const isTransformed = !isFetching && projectCount === 1;
    const projectText = declinateByNum(projectCount, ['project', 'projects']);

    return (
        <section className="page">
            <h1 className="page__title">{`Found ${projectCount} ${projectText}`}</h1>
            <div className="page__wrapper">
                <div className="page__content">
                    <div
                        className={
                            isTransformed
                                ? 'page__list transformed'
                                : 'page__list'
                        }
                    >
                        <>
                            {isFetching ? (
                                <Preloader />
                            ) : isError ? (
                                <div className="page__result">
                                    <h2 className="page__title page__title--error">
                                        Response Error
                                    </h2>
                                    <ButtonRefresh onRefetch={refetch} />
                                </div>
                            ) : isCardsEmpty ? (
                                <div className="page__result">
                                    <h2 className="page__title page__title--result">
                                        No content
                                    </h2>
                                    {!data.length && (
                                        <ButtonRefresh onRefetch={refetch} />
                                    )}
                                </div>
                            ) : (
                                <CardList
                                    filteredItems={filteredItems}
                                    // activeCardId={activeCardId}
                                />
                            )}
                        </>
                    </div>
                    <Banner
                        projectCount={projectCount}
                        projectText={projectText}
                    />
                </div>
                <div className="page__aside">
                    <Filter
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        projectCount={projectCount}
                        projectText={projectText}
                        isDataLoading={isFetching}
                        isError={isError}
                        isCardsEmpty={isCardsEmpty}
                    />
                </div>
            </div>
        </section>
    );
};

export { MainPage };
