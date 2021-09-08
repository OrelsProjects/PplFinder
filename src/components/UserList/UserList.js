import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { v4 as uuid } from 'uuid';
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

    const onFavoriteClick = (user) => {
      user.customID = uuid();
      const newFavorites = favorites ? [...favorites] : [];
      // TODO: Check if user is in favorites -> if so, remove from favorites,
      // otherwise - add.
      newFavorites.push(user)
      localStorage.setItem('favoriteUsers_FindPPL', JSON.stringify(newFavorites));
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
