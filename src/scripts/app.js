import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import SettingsManager from '../scripts/SettingsManager';
import DesignManager from './DesignManager';

import Application from '../components/Application';

window.addEventListener("load", () => {
    if (!SettingsManager.Check()) {
        SettingsManager.Initialize();
    }
    
    if (!DesignManager.Check()) {
        DesignManager.Initialize();
    }

    render(<Application />, $("#render-target")[0]);
});