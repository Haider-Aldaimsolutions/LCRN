import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import { Profile, Search, Home } from '../../screens';
import {
    constants,
    COLORS,
    SIZES,
    FONTS,
} from '../../constants'
import { render } from 'react-dom';
const MainLayout = () => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current

    function renderContent() {
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    snapToInterval={SIZES.width}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    pagingEnabled
                    snapToAlignment='center'
                    horizontal
                    keyExtractor={item => 'Main-' + item.id}

                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width,
                                }}
                            >
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.profile && <Profile />}
                            </View>
                        )
                    }
                    }

                />
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.white }}
        >

            {renderContent()}
        </View>
    )
}

export default MainLayout;
