import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, CardMedia, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useExerciseFeedback } from '../Contexts/ExcerciseFeedback';

const ExercisePreInfo = ({ exercise, onConfirm }) => {
  const [index, setIndex] = useState(0);
  const { updateReps } = useExerciseFeedback();
  const [reps, setReps] = useState('');

  const handleBack = () => {
    if (index === 0) {
      onConfirm(); // 뒤로가기 호출 시 onConfirm을 호출하여 부모 컴포넌트에서 상태를 업데이트합니다.
    } else {
      setIndex(index - 1); // 슬라이드 인덱스를 감소시킵니다.
    }
  };

  const handleNext = () => {
    setIndex(index + 1); // 슬라이드 인덱스를 증가시킵니다.
  };

  const handleConfirm = () => {
    updateReps(reps); // 컨텍스트에 reps 값을 저장합니다.
    onConfirm(); // onConfirm 호출하여 웹캠 페이지로 이동합니다.
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 900 }}>
        <CardMedia
          component="video"
          src={exercise.videoUrl}
          title={exercise.name}
          sx={{ width: { xs: '100%', md: '40%' }, height: 'auto', objectFit: 'cover' }}
          controls
          autoPlay
          muted
          loop
        />
        <CardContent sx={{ width: { xs: '100%', md: '60%' }, padding: 2 }}>
          <SwipeableViews index={index} onChangeIndex={(index) => setIndex(index)}>
            <Box>
              <Typography gutterBottom variant="h4" component="div">
                {exercise.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom mb={2}>
                {exercise.summary}
              </Typography>
              {exercise.description.map((desc, idx) => (
                <Typography
                  key={idx}
                  variant="body1"
                  color="text.primary"
                  sx={{
                    fontWeight: '400',
                    mb: 1.5,
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                  }}
                >
                  {idx + 1}. {desc}
                </Typography>
              ))}
              <Button onClick={handleBack} variant="outlined" color="secondary" sx={{ mt: 2, mr: 2 }}>
                뒤로가기
              </Button>
              <Button onClick={handleNext} variant="contained" color="primary" sx={{ mt: 2 }}>
                운동하기
              </Button>
            </Box>
            <Box>
              <IconButton onClick={handleBack} sx={{ mb: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                몇 회 할까요?
              </Typography>
              <TextField
                fullWidth
                label="회수 입력"
                variant="outlined"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button onClick={handleConfirm} variant="contained" color="primary">
                확인
              </Button>
            </Box>
          </SwipeableViews>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExercisePreInfo;