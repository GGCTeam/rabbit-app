import { Navigation } from 'react-native-navigation';
import Constants from '../utils/constants';
import { stores } from '../stores';

class NavigationService implements IService {
  init = async () => {
    await this.setComponentIdListener();
    await this.setDefaultOptions();
  }

  dismissModal = (cId: string) => {
    Navigation.dismissModal(cId);
  }

  dismissAllModals = () => {
    Navigation.dismissAllModals();
  }

  pushSubredditPosts<T>(cId: string, passProps?: T) {
    this.push(cId, Constants.ScreenNames.PostsScreen, passProps);
  }

  pushPost = (cId: string, passProps: PostScreenProps) => {
    this.push(cId, Constants.ScreenNames.PostScreen, passProps);
  }

  showTextInputPrompt = () => {
    this.show(Constants.ScreenNames.TextInputPrompt);
  }

  private push<T>(cId: string, cName: string, passProps?: T) {
    Navigation.push(cId, {
      component:{name: cName, passProps},
    })
  }

  private show = (cName: string) => {
    Navigation.showModal({
      stack: {
        children: [{component:{name: cName}}]
      }
    });
  }

  // Listeners
  private setComponentIdListener = async () => {
    Navigation.events().registerComponentDidAppearListener(async e => {
      stores.ui.setComponentId(e.componentId);
    });
  }

  private setDefaultOptions = async () => {
    Navigation.setDefaultOptions({
      layout: {
        orientation: ['portrait'],
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow',
      },
      topBar: {
        title: {
          color: Constants.colors.main,
        },
        rightButtonColor: Constants.colors.main,
        leftButtonColor: Constants.colors.main,
        backButton: {
          color: Constants.colors.main,
          showTitle: false,
        }
      },
    });
  }
}

export default new NavigationService();