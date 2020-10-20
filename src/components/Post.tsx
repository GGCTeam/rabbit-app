import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import useStyles from '../utils/useStyles';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import { generateCommentsString, generateRedditUserString, generateSubredditString, kFormatter } from '../utils/helpMethods';

type PostProps = {
  item: RedditPost;
  withSub?: boolean;
  withoutDelete?: boolean;
  onPress: () => void;
  onDelete?: () => void;
}

const Post: React.FC<PostProps> = ({
  item,
  withSub = false,
  withoutDelete = false,
  onPress,
  onDelete,
}) => {
  const { styles, theme } = useStyles(_styles);

  const Wrapper = ({ children }: any) =>
    withoutDelete
      ? <>{children}</>
      : (
        <AppleStyleSwipeableRow
          title={'Delete'}
          backgroundColor={theme.colors.red}
          onPress={onDelete}
        >
          { children }
        </AppleStyleSwipeableRow>
      )

  return (
    <Wrapper>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <View style={styles.upsTextContainer}>
            <Text style={styles.upsText}>{ kFormatter(item.ups) }</Text>
          </View>
          <View style={styles.titlesContainer}>
            <View style={{ flexDirection: 'row' }}>
              { withSub && <Text style={styles.subreddit}>{ generateSubredditString(item.subreddit) } </Text> }
              <Text numberOfLines={1} style={styles.subtitle}>Posted by { generateRedditUserString(item.author) } { dayjs(item.created_utc*1000).fromNow() }</Text>
            </View>
            <Text style={styles.title}>{ item.title }</Text>
            <Text style={styles.subtitle}>{ generateCommentsString(item.num_comments) }</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Wrapper>
  )
}

const _styles = (theme: ThemeType) => StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  titlesContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    color: theme.colors.text,
  },
  subtitle: {
    flex: 1,
    marginVertical: 2,
    fontSize: 14,
    color: theme.colors.grey
  },
  subreddit: {
    marginVertical: 2,
    fontSize: 14,
    color: theme.colors.grey,
    fontWeight: 'bold',
  },
  upsTextContainer: {
    minWidth: 30,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  upsText: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.grey,
  }
});

export default Post;