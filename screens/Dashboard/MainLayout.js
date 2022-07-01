import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import Profile from './Profile';
import Home from './Home';
import Search from './Search';
import { Shadow } from 'react-native-shadow-2';
import {
    constants,
    COLORS,
    SIZES,
    FONTS,
} from '../../constants'
import { render } from 'react-dom';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
    ...bottom_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

    const inputRange = bottom_tabs.map((_, i) => i * SIZES.width)
    const TabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                left: 0,
                height: '100%',
                width: 80,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
                transform: [{
                    translateX
                }]
            }}
        />
    )
}

const Tabs = ({ scrollX }) => {

    const containerRef = React.useRef()
    const [mearuseLayout, setMeasureLayout] = React.useState([])



    React.useEffect(() => {
        let ml = []
        bottom_tabs.forEach(bottom_tab => {
            bottom_tabs?.ref?.current?.mearuseLayout(
                containerRef.current,
                (x, y, width, height) => {
                    ml.push({
                        x, y, height
                    })
                    if (ml.length === bottom_tabs.length) {
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    }, [containerRef.current])

    return (
        <View
            ref={containerRef}
            style={{ flex: 1, flexDirection: 'row' }}>

            {mearuseLayout.length > 0 && <TabIndicator
                mearuseLayout={mearuseLayout} scrollX={scrollX} />}


            {bottom_tabs.map((item, index) => {

                return (
                    <TouchableOpacity
                        key={`BottomTab-${index}`}
                        ref={item.ref}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            paddingVertical: 20,

                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                        <Text
                            style={{ marginTop: 3, color: Colors.white, }}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )

}

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
    function renderBottomTab() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    paddingBottom: 20,
                }}
            >
                <Shadow
                    size={[SIZES.width - (SIZES.padding * 2), 85]}
                >
                    <View
                        style={{
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor: COLORS.primary3,

                        }}
                    >
                        <Tabs
                            scrollX={scrollX}
                        />

                    </View>
                </Shadow>
            </View>
        )
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: COLORS.white }}
        >

            {renderContent()}

            {renderBottomTab()}
        </View>
    )
}

export default MainLayout;
