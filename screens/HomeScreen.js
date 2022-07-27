import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(
          'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s',
        )
          .then(Response => Response.json())
          .then(data1 => {
            // console.log(data1);
            setData(data1['photos']['photo']);
            // console.log(data1['photos']['photo']);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center'}}>Welcome TO Image Gallery</Text>
      <ScrollView
        style={{flexDirection: 'row', flexWrap: 'wrap'}}
        horizontal={true}>
        {data.map((item, index) => {
          return (
            <View key={index}>
              <React.StrictMode>
                <Image
                  source={{
                    uri: item.url_s,
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    margin: 10,
                  }}
                />
              </React.StrictMode>
            </View>
            // console.log(item.url_s)
          );
        })}
      </ScrollView>
      {/* <Image
        source={{
          uri: data[0].url_s,
        }}
        style={{height: 100, width: 100}}
      /> */}
      {/* {console.log(data[0])} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'yellow',
  },
});

export default HomeScreen;
