import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';
import { profileCollection } from '../services/firebase/storage';
import { greet } from '../services/greeter';
import {
  profileState,
  profileStatusState,
  requestProfile,
  userHydrateState,
  userState,
} from '../state/user';
import { Profile } from '../types/Profile';
import { ProfileView } from '../views/ProfileView';

export const ProfilePresenter = () => {
  const user = useRecoilValue(userHydrateState);
  const [profile, setProfile] = useRecoilState(requestProfile);
  const [profileStatus, setProfileStatus] = useRecoilState(profileStatusState);

  const [greeting, setGreeting] = useState<string>();

  const history = useHistory();

  /*
  const profileDetails = useRecoilCallback(({ snapshot, set }) => async () => {
    const user = await snapshot.getPromise(userState);
    profileCollection.observe(user.id, (profile) => {
      set(profileState, profile);
    });
  });
  */

  const hydrateProfile = () => {
    if (user) {
      setProfileStatus('pending');
      return profileCollection.observe(user.id, (profile) => {
        setProfileStatus('fetching');
        if (profile) {
          setProfile(profile);
          setProfileStatus('success');
          return;
        }

        setProfileStatus('fail');
      });
    }
  };

  const handleReplay = (id: string) => {
    history.push(`/replay/${id}`);
  };

  useEffect(() => {
    const unsubscribe = hydrateProfile();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && user.id !== 'N/A') setGreeting(greet(user.name));
  }, []);

  return (
    <ProfileView
      user={user}
      profile={profile}
      isLoading={profileStatus !== 'success'}
      greeting={greeting}
      handleReplay={handleReplay}
    />
  );
};
