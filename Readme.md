```
le/Documents/project/wele-app/ios/build/WELE/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/RNFS.build/Objects-normal/x86_64/RNFSManager.o
/Users/khanhle/Documents/project/wele-app/node_modules/react-native-fs/RNFSManager.m:17:9: fatal error: 'React/RCTImageLoaderProtocol.h' file not found
#import <React/RCTImageLoaderProtocol.h>
        ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1 error generated.
```
- to fix it : 

replace by:  #import <React/RCTImageLoader.h>

