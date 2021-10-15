import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { car_icon, person_icon } from '../../assets'

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Icon = styled.img`

`;

export const Marker = ({ id, text, onClick, isDriver }) => {
    if (isDriver) {
        return (
            <div style={{ position: 'absolute', left: -20, right: 0, bottom: 0 }} >
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 35 }}>
                    <div >
                        <div style={{
                            display: 'flex',
                            fontSize: 18,
                            height: 20,
                            width: '-moz-fit-content',
                            width: 'fit-content',
                            color: '#fff',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 7,
                            borderRadius: 50,
                            backgroundColor: '#111'
                        }}>{text}</div>
                    </div>
                </div>
                <Icon style={{ position: 'absolute', left: 0, right: 0, bottom: 0, }} onClick={() => onClick ? onClick(id) : null} src={car_icon} />
            </div>
        )
    } else {
        return (
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 2 }} >
                <div style={{ position: 'absolute', left: -10, right: 0, bottom: 35 }}>
                    <div style={{
                        display: 'flex',
                        fontSize: 18,
                        height: 20,
                        width: '-moz-fit-content',
                        width: 'fit-content',
                        color: '#111',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 7,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                    }}>{text}</div>
                </div>
                <Icon style={{ position: 'absolute', left: 0, right: 0, bottom: 0, }} onClick={() => onClick ? onClick(id) : null} src={person_icon} />
            </div>
        )
    }
};

Marker.defaultProps = {
    onClick: null,
    isDriver: false
};

Marker.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
    isDriver: PropTypes.bool
};