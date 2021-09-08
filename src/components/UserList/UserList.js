import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { useFavoriteFetch } from '../../hooks';

const UserList = ({ users, isLoading, onCountryChange }) => {
  const { favorites } = useFavoriteFetch()
  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const isCountryInList = (value) => {
    return selectedCountries.filter(countryCode=>countryCode === value).length > 0
  }
  const onChange = (value) => {
    let currentSelectedCountries = [...selectedCountries];
    if(isCountryInList(value)){
      currentSelectedCountries = 
        currentSelectedCountries.filter(countryCode=>countryCode != value);
    } else {
      currentSelectedCountries.push(value);
    }
    setSelectedCountries(currentSelectedCountries);
    };

    function objectEquals(x, y) {  
      if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
      // after this just checking type of one would be enough
      if (x.constructor !== y.constructor) { return false; }
      // if they are functions, they should exactly refer to same one (because of closures)
      if (x instanceof Function) { return x === y; }
      // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
      if (x instanceof RegExp) { return x === y; }
      if (x === y || x.valueOf() === y.valueOf()) { return true; }
      if (Array.isArray(x) && x.length !== y.length) { return false; }
  
      // if they are dates, they must had equal valueOf
      if (x instanceof Date) { return false; }
  
      // if they are strictly equal, they both need to be object at least
      if (!(x instanceof Object)) { return false; }
      if (!(y instanceof Object)) { return false; }
  
      // recursive object equality check
      var p = Object.keys(x);
      return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
          p.every(function (i) { return objectEquals(x[i], y[i]); });
  }
  
  const createCustomID = (user) => {
    return `${user.cell}${user.gender}${user.email}`
  }

    const isFavoritesContainUser = (user, favorites) => {
      return favorites ? favorites.filter(it=>createCustomID(it) === user.customID) : false;
    }

    const onFavoriteClick = (user) => {
      let newUser = JSON.parse(JSON.stringify(user));
      newUser.customID = createCustomID(newUser);
      const currentFavorites =  JSON.parse(localStorage.getItem('favoriteUsers_FindPPL'));
      let newFavorites = [];
      if(isFavoritesContainUser(newUser, currentFavorites)){
        debugger;
        newFavorites = currentFavorites.filter(favorite=>favorite.customID != newUser.customID);
      } else {
        newFavorites = currentFavorites ? [...currentFavorites] : [];
        const userString = JSON.stringify(newUser);
        newFavorites.push(userString);
      }
      localStorage.setItem('favoriteUsers_FindPPL', JSON.stringify(newFavorites));
      console.log(newFavorites);
    }

    useEffect(()=>{
      onCountryChange(selectedCountries);
    }, [selectedCountries]);


  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange = {onChange}/>
        <CheckBox value="AU" label="Australia" onChange = {onChange}/>
        <CheckBox value="CA" label="Canada" onChange = {onChange}/>
        <CheckBox value="DE" label="Germany" onChange = {onChange}/>
        <CheckBox value="NL" label="Netherlands" onChange = {onChange}/>
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton onClick={()=>onFavoriteClick(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
