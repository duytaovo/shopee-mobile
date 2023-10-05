import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../../constants";
import getHomeScreen from "../../services/getHomeScreen";
import Spinner from "react-native-loading-spinner-overlay";
import FontWrapper from "../../components/wrapper/FontWrapper";
import HeaderWrapper from "../../components/wrapper/HeaderWrapper";
import SearchUI from "../../components/shared/SearchUI";
import ButtonCart from "../../components/shared/buttons/ButtonCart";
import ButtonMessage from "../../components/shared/buttons/ButtonMessage";
import ScrollRefreshWrapper from "../../components/wrapper/ScrollRefreshWrapper";
import SwiperSlide from "./components/SwiperSlide";
import Banner from "./components/Banner";
import TwoRowNav from "./components/TwoRowNav";
import HeadingWrapper from "../../components/wrapper/HeadingWrapper";
import ListCardVertical from "../../components/shared/card/ListCardVertical";

const HomeScreen: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    animatedValue.setValue(offsetY);
  };

  const headerBackgroundAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: ["transparent", COLORS.white],
      extrapolate: "clamp",
    }),
  };

  const inputBackgroundAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [COLORS.white, COLORS.gray],
      extrapolate: "clamp",
    }),
  };

  const iconShowAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const iconHiddenAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeScreen,
  });

  const [sliders, categories, products] = data;

  if (isLoading)
    return <Spinner visible={isLoading} textContent={"Loading..."} />;

  return (
    <FontWrapper>
      <HeaderWrapper style={headerBackgroundAnimation}>
        <SearchUI style={inputBackgroundAnimation} />
        <View style={styles.headerRight}>
          <View>
            <ButtonCart style={iconHiddenAnimation} />
            <ButtonCart
              style={[styles.featureIcon, iconShowAnimation]}
              color={COLORS.primary}
            />
          </View>
          <View>
            <ButtonMessage style={iconHiddenAnimation} />
            <ButtonMessage
              style={[styles.featureIcon, iconShowAnimation]}
              color={COLORS.primary}
            />
          </View>
        </View>
      </HeaderWrapper>

      <ScrollRefreshWrapper
        onScroll={(e) => handleScroll(e)}
        onRefresh={refetch}
      >
        <SwiperSlide data={sliders} />
        <View style={styles.banner}>
          <Banner />
        </View>
        <View style={styles.twoRowNav}>
          <TwoRowNav data={categories} />
        </View>
        <HeadingWrapper style={styles.headingWrapper}>
          <Text style={styles.heading}>gợi ý hôm nay</Text>
        </HeadingWrapper>
        <ListCardVertical products={products} />
        <View style={styles.paddingBottom} />
      </ScrollRefreshWrapper>
    </FontWrapper>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
  },
  featureIcon: {
    position: "absolute",
    top: 0,
  },
  banner: {
    position: "absolute",
    top: 200,
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  twoRowNav: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.secondary,
  },
  headingWrapper: {
    paddingTop: 20,
    backgroundColor: "transparent",
  },
  heading: {
    color: COLORS.primary,
    textTransform: "uppercase",
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
});

export default HomeScreen;
