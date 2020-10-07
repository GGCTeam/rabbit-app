import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import useStyles from '../utils/useStyles';
import { generateCommentsString, generateRedditUserString, generateSubredditString } from '../utils/helpMethods';

type PostProps = {
  item: RedditPost;
  withSub?: boolean;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({
  item,
  withSub = false,
  onPress,
}) => {
  const { styles } = useStyles(_styles);

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <View style={styles.upsTextContainer}>
            <Text style={styles.upsText}>{ item.ups }</Text>
          </View>
          <View style={styles.titlesContainer}>
            <Text style={styles.subtitle}>Posted by { generateRedditUserString(item.author) } { dayjs(item.created_utc*1000).fromNow() }</Text>
            { withSub && <Text style={styles.subtitle}>in { generateSubredditString(item.subreddit) }</Text> }
            <Text style={styles.title}>{ item.title }</Text>
            <Text style={styles.subtitle}>{ generateCommentsString(item.num_comments) }</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
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
  upsTextContainer: {
    minWidth: 30,
    margin: 2,
  },
  upsText: {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.grey,
  }
});

export default Post;