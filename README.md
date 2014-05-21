# jqPagination, a jQuery pagination plugin (obviously)

    GitHub  : http://github.com/beneverard/jqPagination  
    Demo    : http://beneverard.github.com/jqPagination#demo  
    
    Website : http://beneverard.co.uk  
    Email   : hello@beneverard.co.uk  
    Twitter : @ilmv  


## Changelog

### 1.4
- Improved: Getting of plugin options
- New: Added contributors file
- Improved: Moved styles from LESS to SCSS
- Improved: Tidied up repo HTML
- Fixed: Re-ordered setting plugin options to prevent current page exceeding max pages (fixed by [wh](https://github.com/beneverard/jqPagination/pull/34))

### 1.3
- Improved: Added functionality to pass multiple options to option method (based on [m-hume's code](https://github.com/beneverard/jqPagination/pull/20))
- Fixed: Prevent the triggering of the updated calback on set option (based on [m-hume's code](https://github.com/beneverard/jqPagination/pull/20))
- Improved: Seting the page to the current page no longer returns false

### 1.2.4
- Demo: Removed ObserverApp analytics code from demo
- Demo: Updated copyright date in demo
- Demo: Updated feedback and support copy in demo

### 1.2.3
- Improved: Added plugin manifest for jQuery plugins repo

### 1.2.2
- Fixed: Incorrect GitHub fork ribbon image url
- Fixed: Added Google Analytics tracker code
- Fixed: Initial input focus setting undefined value

### 1.2.1
- Fixed: callMethod function was failing to call the desired function

### 1.2
- Fixed: Added fallback for the `console` object methods
- Improved: Now using `.on()` jQuery event handler
  - Note: Updated jQuery to 1.7.2
- Improved: Modified method handling
- New: Added `destroy` method

### 1.1.1
- Fixed: Prevent `paged()` callback from firing on initialisation

### 1.1
- Feature: Exposed get / set `max_page` and `current_page` options (based on [Zikes' code](https://github.com/beneverard/jqPagination/pull/4))
- Feature: Added disabled class (based on [Zikes' code](https://github.com/beneverard/jqPagination/pull/7))
- Fixed: Added proper CSS gradients and fallback
- Fixed: 'invalid assignment left-hand side' bug in Firefox

### 1.0

- Initial release

## Contributors

- Ben Everard ([beneverard](http://github.com/beneverard))
- Jason Hutchinson ([Zikes](http://github.com/Zikes))
- [m-hume](http://github.com/m-hume)
- Will Mernagh [wm](https://github.com/wm)

### Copyright and license
	 
	Copyright (C) 2013 Ben Everard
	
	http://beneverard.github.com/jqPagination
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.
	
	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.