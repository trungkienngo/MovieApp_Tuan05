import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Switch,
  RefreshControl,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MovieCard, {
  Movie,
} from './components/MovieCard';

const API_URL =
  'https://6abb5879b2118ed7abb84b4a.mockapi.io/movies';

function MainScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [isTile, setIsTile] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu');
      }

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.log('Lỗi:', error);

      Alert.alert(
        'Lỗi',
        'Không thể tải danh sách phim'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Khi nhấn vào MovieCard
  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find(
        (item) => item.id === id
      );

      if (movie) {
        Alert.alert(
          'Tên phim',
          movie.title
        );
      }
    },
    [movies]
  );

  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchMovies();

    setRefreshing(false);
  };

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Câu 1 */}
        <Text style={styles.title}>
          Movie App
        </Text>

        {/* Câu 5 */}
        <View style={styles.header}>
          <Text style={styles.switchText}>
            Dạng lưới
          </Text>

          <Switch
            value={isTile}
            onValueChange={setIsTile}
          />
        </View>

        {/* Câu 2 */}
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            key={isTile ? 'grid' : 'list'}

            data={movies}

            numColumns={numColumns}

            keyExtractor={(item) =>
              String(item.id)
            }

            renderItem={({ item }) => (
              <MovieCard
                movie={item}

                layout={
                  isTile
                    ? 'tile'
                    : 'row'
                }

                onSelect={handleSelect}
              />
            )}

            columnWrapperStyle={
              isTile
                ? styles.columnWrapper
                : undefined
            }

            refreshControl={
              <RefreshControl
                refreshing={refreshing}
onRefresh={handleRefresh}
              />
            }

            contentContainerStyle={
              styles.list
            }
          />
        )}

      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  container: {
    flex: 1,
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#ffffff',

    padding: 12,

    borderRadius: 10,

    marginBottom: 15,
  },

  switchText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  list: {
    paddingBottom: 20,
  },
});