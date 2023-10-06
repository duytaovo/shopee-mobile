import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text } from "native-base";
import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS } from "../../constants";
import FontWrapper from "../../components/wrapper/FontWrapper";
import HeaderWrapper from "../../components/wrapper/HeaderWrapper";
import ButtonBack from "../../components/shared/buttons/ButtonBack";
import SearchUI from "../../components/shared/SearchUI";
import getProductById from "../../services/product/getProductById";
import ButtonShare from "../../components/shared/buttons/ButtonShare";
import ButtonCart from "../../components/shared/buttons/ButtonCart";
import ButtonThreeDot from "../../components/shared/buttons/ButtonThreeDot";
import ScrollRefreshWrapper from "../../components/wrapper/ScrollRefreshWrapper";
import Carousel from "./components/Carousel";
import Content from "./components/Content";

interface RouteParams {
  id: string;
}

const ProductScreen: React.FC = () => {
  const router = useRoute();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { id } = router.params as RouteParams;

  const headerBackgroundAnimation = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: ["transparent", COLORS.white],
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

  const iconShowAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const inputAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    animatedValue.setValue(offsetY);
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`product-${id}`],
    queryFn: () => getProductById(id),
  });
  return (
    <FontWrapper style={styles.wrapper}>
      <HeaderWrapper style={headerBackgroundAnimation}>
        <View>
          <ButtonBack style={iconHiddenAnimation} rounded />
          <ButtonBack
            style={[styles.featureIcon, iconShowAnimation]}
            color={COLORS.primary}
          />
        </View>
        <SearchUI
          placeholder={data?.categories?.[0]?.name}
          style={[styles.input, inputAnimation]}
        />
        <View style={styles.headerRight}>
          <View>
            <ButtonShare style={iconHiddenAnimation} rounded />
            <ButtonShare
              style={[styles.featureIcon, iconShowAnimation]}
              color={COLORS.primary}
            />
          </View>
          <View>
            <ButtonCart style={iconHiddenAnimation} rounded />
            <ButtonCart
              style={[styles.featureIcon, iconShowAnimation]}
              color={COLORS.primary}
            />
          </View>
          <View>
            <ButtonThreeDot style={iconHiddenAnimation} rounded />
            <ButtonThreeDot
              style={[styles.featureIcon, iconShowAnimation]}
              color={COLORS.primary}
            />
          </View>
        </View>
      </HeaderWrapper>
      <ScrollRefreshWrapper
        onScroll={(e) => handleScroll(e)}
        onRefresh={refetch}
        style={styles.container}
      >
        <Carousel data={data.images} />
        {/* product detail */}
        <Content data={data} />
      </ScrollRefreshWrapper>
    </FontWrapper>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: COLORS.gray,
  },
  featureIcon: {
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  title: {
    flex: 1,
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {},
});

export default ProductScreen;
