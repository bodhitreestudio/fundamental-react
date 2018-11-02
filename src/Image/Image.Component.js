import React from 'react';
import { Image } from '../';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../';
import { Playground } from '../documentation/Playground/Playground';

export const ImageComponent = () => {
    const sizesImageCode = `<Image size="s" photo="https://placeimg.com/400/400/nature"></Image>
<Image size="m" photo="https://placeimg.com/400/400/nature"></Image>
<Image size="l" photo="https://placeimg.com/400/400/nature"></Image>`;

    const shapesImageCode = `<Image size="s" type="circle" photo="https://placeimg.com/400/400/nature"></Image>
<Image size="m" type="circle" photo="https://placeimg.com/400/400/nature"></Image>
<Image size="l" type="circle" photo="https://placeimg.com/400/400/nature"></Image>`;
    return (
        <div>
            <Header>Image</Header>
            <Description>
                When using images, use the following helpers classes to adjust the size and the shape.
            </Description>
            <Import module="Image" path="/fundamental-react/src/" />

            <Separator />

            <Properties
                type="Inputs"
                properties={[
                    {
                        name: 'size',
                        description:
                            "String (required)- the size of the image. Size options include 's' (24x24), 'm' (36x36), and 'l' (48x48)."
                    },
                    { name: 'photo', description: 'String (required) - picture url.' },
                    { name: 'type', description: 'String - When set to true renders a round image.' }
                ]}
            />

            <Separator />

            <h2>Sizes</h2>
            <DocsTile>
                <div class="fd-doc__margin">
                    <Image size="s" photo="https://placeimg.com/400/400/nature" />
                    <Image size="m" photo="https://placeimg.com/400/400/nature" />
                    <Image size="l" photo="https://placeimg.com/400/400/nature" />
                </div>
            </DocsTile>
            <DocsText>{sizesImageCode}</DocsText>

            <Separator />

            <h2>Shapes</h2>
            <DocsTile>
                <div class="fd-doc__margin">
                    <Image size="s" type="circle" photo="https://placeimg.com/400/400/nature" />
                    <Image size="m" type="circle" photo="https://placeimg.com/400/400/nature" />
                    <Image size="l" type="circle" photo="https://placeimg.com/400/400/nature" />
                </div>
            </DocsTile>
            <DocsText>{shapesImageCode}</DocsText>

            <Separator />
            <h2>Playground</h2>
            <Playground
                component="image"
                schema={[
                    {
                        attribute: 'size',
                        typeOfAttribute: 'string',
                        enum: ['s', 'm', 'l']
                    },
                    {
                        attribute: 'photo',
                        typeOfAttribute: 'string'
                    },
                    {
                        attribute: 'type',
                        typeOfAttribute: 'string',
                        enum: ['', 'circle']
                    }
                ]}
            >
                <Image size="s" type="" photo="https://placeimg.com/400/400/nature" />
            </Playground>
        </div>
    );
};
