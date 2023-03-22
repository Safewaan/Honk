import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../common/NavigationBar';
import Search from '../common/Search';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Text
} from '@chakra-ui/react';

import "../../styles/form-style.css";

const { REACT_APP_API_ENDPOINT } = process.env;

const MyResources = () => {

    const { currentUser } = useAuth();
    const history = useHistory()

    const [searchTerm, setSearchTerm] = React.useState("");
    const [refreshSearch, setRefreshSearch] = React.useState(1);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }
    const [userID, setUserID] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [resources, setResources] = React.useState([]);
    const [selectedResource, setSelectedResource] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [showEditAlertMessage, setShowEditAlertMessage] = React.useState(false);

    const [resourceTitle, setResourceTitle] = React.useState("");
    const [resourceTitleError, setResourceTitleError] = React.useState("");
    const [resourceTitleErrorText, setResourceTitleErrorText] = React.useState("");
    const handleResourceTitle = (resource) => {
        setResourceTitle(resource.target.value);
        setResourceTitleError(false);
        setResourceTitleErrorText('');
    }
    const [resourceLink, setResourceLink] = React.useState("");
    const [resourceLinkError, setResourceLinkError] = React.useState("");
    const [resourceLinkErrorText, setResourceLinkErrorText] = React.useState("");
    const handleResourceLink = (resource) => {
        setResourceLink(resource.target.value);
        setResourceLinkError(false);
        setResourceLinkErrorText('');
    }
    const [resourceTag, setResourceTag] = React.useState("");
    const [resourceTagError, setResourceTagError] = React.useState("");
    const [resourceTagErrorText, setResourceTagErrorText] = React.useState("");
    const handleResourceTag = (resource) => {
        setResourceTag(resource.target.value);
        setResourceTagError(false);
        setResourceTagErrorText('');
    }

    React.useEffect(() => {
        setEmail(currentUser.email);
        loaduserSearchByEmail(currentUser.email);
    }, []);

    const loaduserSearchByEmail = (email) => {
        callApiGetuserSearchByEmail(email)
            .then(res => {
                var parsed = JSON.parse(res.express);
                //console.log(parsed[0].id);
                setUserID(parsed[0].id);
            });
    }

    const callApiGetuserSearchByEmail = async (email) => {
        const url = `${REACT_APP_API_ENDPOINT}/userSearchByEmail`;
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    React.useEffect(() => {
        setEmail(currentUser.email);
        loaduserSearchByEmail(currentUser.email)
    }, []);

    const loadgetResourcesByUser = async () => {
        try {
            const res = await callAPIgetResourcesByUser(userID, searchTerm);
            const parsed = JSON.parse(res.express);
            setResources(parsed);
        } catch (error) {
            console.error(error);
        }
    }

    const callAPIgetResourcesByUser = async (userID, searchTerm) => {

        const url = `${REACT_APP_API_ENDPOINT}/getResourcesByUser?userID=${userID}&searchTerm=${searchTerm}`;
        console.log(url);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const body = await response.json();
        console.log("got here");
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    useEffect(() => {
        loadgetResourcesByUser();
    }, [userID, refreshSearch]);

    const handleEditForum = () => {
        if (resourceTitle === '') {
            setResourceTitleError(true);
            setResourceTitleErrorText('Please enter the resource title');
            return false;
        } else if (resourceLink === '') {
            setResourceLinkError(true);
            setResourceLinkErrorText('Please enter the resource link');
            return false;
        } else {
            //console.log("about to call api edit forum");
            CallApiEditResource();
            setShowEditAlertMessage(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }

    const CallApiEditResource = async () => {

        const url = `${REACT_APP_API_ENDPOINT}/editResource`;
        console.log(url);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                resourceTitle: resourceTitle,
                resourceLink: resourceLink,
                resourceforumTag: resourceTag,
            })
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    const handleOpenDialog = (resource) => {
        setSelectedResource(resource);
        setIsDialogOpen(true);

        // Update resource title
        setResourceTitle(resource.resourcesTitle);
        setResourceTitleError(false);
        setResourceTitleErrorText('');

        // Update resource link
        setResourceLink(resource.resourcesLink);
        setResourceLinkError(false);
        setResourceLinkErrorText('');

        // Update resource media tag
        setResourceTag(resource.mediaTag);
        setResourceTagError(false);
        setResourceTagErrorText('');

    };

    const handleCloseDialog = () => {
        setSelectedResource(null);
        setIsDialogOpen(false);
    };

    const handleRefreshSearch = async () => {
        setSearchTerm("");
        setRefreshSearch(refreshSearch + 1);
    }

    return (
        <div id="body">

            <NavigationBar></NavigationBar>

            <Box sx={{ position: 'absolute', top: 115, left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    component="div">
                    My Resources
                </Typography>
            </Box>

            <Box sx={{ width: '600px', position: 'absolute', top: 150, left: '50%', transform: 'translateX(-50%)', marginBottom: '20px' }}>
                <Search
                    label="Search for resource names or creators"
                    searchTerm={searchTerm}
                    onSetSearch={handleSearch}
                    fullWidth
                    onButtonClick={loadgetResourcesByUser}
                    onResetSearch={handleRefreshSearch}
                />
            </Box>

            <Box sx={{ position: 'absolute', top: 260, left: '50%', transform: 'translateX(-50%)' }}>
                {resources.map((resources) => (
                    <Card style={{ width: '800px', marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {resources.resourcesTitle}<br />
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Posted on {new Date(new Date(resources.dateTime).getTime() - (5 * 60 * 60 * 1000)).toLocaleDateString()}
                            </Typography>
                            <a href={`${resources.resourcesLink}`} target="_blank">
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <br />{resources.resourcesLink}<br />
                                </Typography>
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </div>
    );

}

const ResourceTitle = ({ resourceTitle, onEnterResourceTitle, resourceTitleError, resourceTitleErrorText }) => {
    return (
        <div>
            <Input
                id="resource-title"
                label="Title"
                placeholder="Enter the resource title"
                value={resourceTitle}
                onChange={onEnterResourceTitle}
                error={resourceTitleError}
                fullWidth
            />
            <FormHelperText>{resourceTitleErrorText}</FormHelperText>
        </div>
    )
}




export default MyResources; 
