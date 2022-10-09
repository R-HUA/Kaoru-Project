import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Spinner from "../components/spinner/spinner";
import Feed from "../components/Feed/feed";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Spinner">
                <Spinner/>
            </ComponentPreview>
            <ComponentPreview path="/Feed">
                <Feed/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews