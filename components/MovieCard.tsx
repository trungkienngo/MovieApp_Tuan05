import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export type Movie = {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number | string;
  poster: string;
  isShowing: boolean;
};

export type MovieCardProps = {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function MovieCard({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) {
  const isTile = layout === 'tile';

  const rating = Number(movie.rating);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}
      onPress={() => onSelect(movie.id)}
    >
      <View
        style={[
          styles.posterContainer,
          isTile && styles.posterContainerTile,
        ]}
      >
        <Image
          source={{ uri: movie.poster }}
          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}
          resizeMode="cover"
        />

        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              ⭐ {rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}
      >
        <Text
          style={styles.title}
          numberOfLines={isTile ? 1 : undefined}
        >
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text>
              Thể loại: {movie.genre}
            </Text>

            <Text>
              Năm: {movie.year}
            </Text>

            <Text>
              ⭐ {rating.toFixed(1)}
            </Text>
          </>
        )}

        <Text style={styles.status}>
          {movie.isShowing
            ? '✅ Đang chiếu'
            : '❌ Ngừng chiếu'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
  },

  cardTile: {
    width: '48%',
    flexDirection: 'column',
    padding: 0,
    overflow: 'hidden',
  },

  posterContainer: {
    position: 'relative',
  },

  posterContainerTile: {
    width: '100%',
  },

  poster: {
    width: 70,
    height: 100,
  },

  posterTile: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
  },

  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  infoTile: {
    marginLeft: 0,
    padding: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  status: {
    marginTop: 5,
  },

  ratingBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
  },ratingBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});