import React, {Component} from 'react';
import "../css/Form.css";
import "axios";
import axios from "axios";

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: 0,
            latitude: 0,
            radius: 0,
            errors: {
                longitude: '',
                latitude: '',
                radius: ''
            }
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        let errors = {...this.state.errors};
        switch (name) {
            case 'longitude':
                errors[name] = isNaN(value) ? 'Lütfen geçerli bir sayı girin.' : '';
                if (name === 'longitude') {
                    if (value > 180) {
                        errors[name] = 'Boylam 180\'den büyük olamaz.';
                    } else if (value < -180) {
                        errors[name] = 'Boylam -180\'den küçük olamaz.';
                    }
                }
                break;
            case 'latitude':
                errors[name] = isNaN(value) ? 'Lütfen geçerli bir sayı girin.' : '';
                if (name === 'latitude') {
                    if (value > 90) {
                        errors[name] = 'Enlem 90\'den büyük olamaz.';
                    } else if (value < -90) {
                        errors[name] = 'Enlem -90\'den küçük olamaz.';
                    }
                }
                break;
            case 'radius':
                errors[name] = isNaN(value) ? 'Lütfen geçerli bir sayı girin.' : '';
                if (name === 'radius') {
                    if (value > 1000) {
                        errors[name] = 'Yarıçap 1000\'den büyük olamaz.';
                    } else if (value <= 0) {
                        errors[name] = 'Yarıçap 0 veya daha küçük olamaz.';
                    }
                }
                break;
            default:
                break;
        }

        this.setState({errors, [name]: value});
    }

    handleSubmit  = async  (event) => {
        const { longitude,radius,latitude,errors } = this.state;
        if (Object.values(errors).some(error => error !== '')) {
            alert('Formda hatalar var. Lütfen hataları düzeltin.');
            event.preventDefault();
        } else {
            try {
                const response = await axios.get(`http://localhost:8070/search?radius=${radius}&latitude=${latitude}&longitude=${longitude}`).then()

                if (response.status === 200) {
                    alert(`Veri: ${response.data}`);
                } else {
                    alert(`İstek başarısız oldu. Durum kodu: ${response.status}`);
                    event.preventDefault();
                }
            } catch (error) {
                alert(`İstek sırasında bir hata oluştu: ${error.message}`);
                event.preventDefault();
            }

        }


    }

    render() {
        const {errors} = this.state;

        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    {errors.longitude && <div className="error">{errors.longitude}</div>}
                    <label htmlFor="boylam">Boylam</label>
                    <input
                        type="number"
                        id="longitude"
                        value={this.state.longitude}
                        onChange={this.handleChange}
                        name="longitude"
                        placeholder="Boylam Girin.."
                    />

                    {errors.latitude && <div className="error">{errors.latitude}</div>}
                    <label htmlFor="enlem">Enlem</label>
                    <input
                        type="number"
                        id="latitude"
                        value={this.state.latitude}
                        onChange={this.handleChange}
                        name="latitude"
                        placeholder="Enlem Girin.."
                    />

                    {errors.radius && <div className="error">{errors.radius}</div>}
                    <label htmlFor="yarıçap">Yarıçap</label>
                    <input
                        type="number"
                        id="radius"
                        value={this.state.radius}
                        onChange={this.handleChange}
                        name="radius"
                        placeholder="Yarıçap Girin.."
                    />


                    <input type="submit" value="Gönder"/>
                </form>
            </div>
        );
    }
}