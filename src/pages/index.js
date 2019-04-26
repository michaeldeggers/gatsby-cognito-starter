import React from 'react';
import { isBrowser, isLoggedIn } from '../utils/auth';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import axios from 'axios';
import { graphql } from 'gatsby';

class IndexPage extends React.Component {
    state = {
        loading: false,
        error: false,
        pupper: {
            img: '',
            breed: '',
        },
    };

    componentDidMount() {
        this.fetchRicksPupper();
    }

    render() {
        const {
            rickAndMorty: { character },
        } = this.props.data;

        const { img, breed } = this.state.pupper;

        return (
            <Layout>
                <SEO
                    title="Home"
                    keywords={[`gatsby`, `application`, `react`]}
                />
                <h1>Hello {isLoggedIn() ? 'user' : 'world'}!</h1>
                <span>ENV: {`${process.env.GATSBY_ENV}`}</span>
                <h2>{character.name} With His Pupper</h2>
                <p>Rick & Morty API data loads at build time.</p>
                <div>
                    <img
                        src={character.image}
                        alt={character.name}
                        style={{ width: 300 }}
                    />
                </div>
                <div>
                    {this.state.loading ? (
                        <p>Please hold, pupper incoming!</p>
                    ) : img && breed ? (
                        <>
                            <h2>{`${breed} pupper!`}</h2>
                            <img
                                src={img}
                                alt={`cute random `}
                                style={{ maxWidth: 300 }}
                            />
                        </>
                    ) : (
                        <p>Oh noes, error fetching pupper :(</p>
                    )}
                </div>
            </Layout>
        );
    }

    // This is an example of using a REST API to grab live data
    fetchRicksPupper = () => {
        this.setState({ loading: true });
        axios
            .get(`https://dog.ceo/api/breeds/image/random`)
            .then(pupper => {
                const {
                    data: { message: img },
                } = pupper;
                const breed = img.split('/')[4];
                this.setState({
                    loading: false,
                    pupper: {
                        ...this.state.pupper,
                        img,
                        breed,
                    },
                });
            })
            .catch(error => {
                this.setState({ loading: false, error });
            });
    };
}

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
    {
        rickAndMorty {
            character(id: 1) {
                name
                image
            }
        }
    }
`;

export default IndexPage;
