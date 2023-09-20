import React from 'react';
import { Logo } from '@ellucian/react-design-system/core';
import { colorFillLogoAlternativePowerButton } from '@ellucian/react-design-system/core/styles/tokens';

const styles = {
    logoPreferredBackground: {
        backgroundColor: colorFillLogoAlternativePowerButton,
        width: '12rem',
    }
};

const handleClick = () => {
    console.log('Hey! You clicked me.');
};

/**
 * Console Log Click Event
 */
const LogoExample = () => {
    const customId = 'LogoClickExample';

    return (
        <div id={`${customId}_Container`}>
            <div
                id={`${customId}_LogoContainer`}
                style={styles.logoPreferredBackground}
            >
                <Logo
                    id={`${customId}_LogoPreferred`}
                    logo="preferred"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default LogoExample;
