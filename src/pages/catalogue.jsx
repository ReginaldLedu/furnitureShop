/* eslint-disable react/prop-types */
import React, { memo, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header/header';
import { Catalog_box } from '../components/catalog_box/catalog_box';
import { useGetFirstPageOfFurnitureQuery } from '../store/rtk';
import { TitleCatalog } from '../components/title-catalog/title-catalog';

export const Catalogue = memo(function CatalogueIn(props) {
  const { data: all } = useGetFirstPageOfFurnitureQuery();
  const [renderedList, setRenderedList] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const getFurnitureByPageASYNC = useCallback(() => {
    console.log(pageNumber <= totalCount);
    if (fetching)
      fetch('http://localhost:5000/api/furniture')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setRenderedList([...renderedList, ...json]);
          setTotalCount(json.pages);
          setPageNumber(prevState => prevState + 1);
        })
        .finally(() => setFetching(false));
  });

  const scrollHandler = useCallback(e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      pageNumber <= totalCount
    ) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  });
  const forScroll = useCallback(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  useEffect(() => {
    if ((all !== undefined) & (searchWord.length === 0)) {
      console.log(searchWord);
      setRenderedList(all);
    }
  }, [all]);

  const [searchWord, setSearchWord] = useState('');
  const sortOnChange = useCallback((e, searchWord) => {
    console.log(renderedList);
    if (searchWord.length === 0) {
      switch (e.target.value) {
        case 'new':
          fetch('http://localhost:5000/api/furniture')
            .then(response => response.json())
            .then(json => setRenderedList(json));
          break;
        case 'toexpensive':
          fetch('http://localhost:5000/api/furniture')
            .then(response => response.json())
            .then(json => setRenderedList(json));
          break;
        case 'tocheap':
          fetch('http://localhost:5000/api/furniture')
            .then(response => response.json())
            .then(json => setRenderedList(json.reverse()));
          break;
        case 'popular':
          fetch('http://localhost:5000/api/furniture')
            .then(response => response.json())
            .then(json => setRenderedList(json));
      }
    } else {
      if (e.target.value === 'popular') {
        const forSort = renderedList;
        console.log(forSort);
        setRenderedList(
          forSort.sort(function (a, b) {
            return b.likes - a.likes;
          })
        );
        console.log(renderedList);
      } else if (e.target.value === 'tocheap') {
        const forSort = renderedList;
        console.log(forSort);
        setRenderedList(
          forSort.sort(function (a, b) {
            return b.price - a.price;
          })
        );
        console.log(renderedList);
      } else if (e.target.value === 'toexpensive') {
        const forSort = renderedList;
        console.log(forSort);
        setRenderedList(
          forSort.sort(function (a, b) {
            return a.price - b.price;
          })
        );
        console.log(renderedList);
      }
    }
  });

  const searchOnClick = useCallback(searchWord => {
    fetch('http://localhost:5000/api/furniture')
      .then(response => response.json())
      .then(json => {
        const filteredRTK = json.filter(
          item =>
            item.title.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.description.toLowerCase().includes(searchWord.toLowerCase()) ||
            item.category.toLowerCase().includes(searchWord.toLowerCase())
        );
        setRenderedList(filteredRTK);
      });
  });

  return (
    <>
      <Header cls="catalog__top center">
        <TitleCatalog />
      </Header>
      <Catalog_box
        removeFromLiked={props.removeFromLiked}
        fetching={fetching}
        getFurnitureByPageASYNC={getFurnitureByPageASYNC}
        setFetching={setFetching}
        forScroll={forScroll}
        searchOnClick={searchOnClick}
        sortOnChange={sortOnChange}
        setLike={props.setLike}
        addToTheCart={props.addToTheCart}
        list={renderedList}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />
    </>
  );
});

Catalogue.propTypes = {
  addToTheCart: PropTypes.func,
  setLike: PropTypes.func,
  removeFromLiked: PropTypes.func,
};
