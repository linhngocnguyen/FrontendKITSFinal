import './Pomodoro.css';
import { useState, useEffect } from 'react';
import { Button, InputNumber, Form, Layout, Typography, Space } from 'antd';
const { Title } = Typography;
const { Header, Content } = Layout;

function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workingTime, setWorkingTime] = useState(60);
  const [breakTime, setBreakTime] = useState(60);
  const [showSettings, setShowSettings] = useState(false);

  let [now, setNow] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date());
    }, 1000);
  }, [now]);

  useEffect(() => {
    let intervalId;

    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      clearInterval(intervalId);
      setIsRunning(false);

      if (!isBreak) {
        setIsBreak(true);
        setSecondsLeft(breakTime);
        setIsRunning(true);
      } else {
        setIsBreak(false);
        setSecondsLeft(workingTime);
        setIsRunning(true);
      }
    }

    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft, isBreak, workingTime, breakTime]);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsBreak(false);
    setIsRunning(false);
    setSecondsLeft(workingTime);
  }

  function formatTime(secondsLeft) {
    let mins = parseInt(secondsLeft / 60);
    let secs = parseInt(secondsLeft % 60);
    if (mins < 10) {
      mins = '0' + mins;
    }
    if (secs < 10) {
      secs = '0' + secs;
    }
    return `${mins}:${secs}`;
  }

  function handleWorkingTimeChange(value) {
    const newWorkingTime = parseInt(value) * 60;
    setWorkingTime(newWorkingTime);
    if (!isBreak) {
      setSecondsLeft(newWorkingTime);
    }
  }

  function handleBreakTimeChange(value) {
    const newBreakTime = parseInt(value) * 60;
    setBreakTime(newBreakTime);
    if (isBreak) {
      setSecondsLeft(newBreakTime);
    }
  }

  function handleSettingsSubmit(event) {
    event.preventDefault();
    setShowSettings(false);
    reset();
  }

  const backgroundMode = `pomodoro ${isBreak ? 'break' : 'work'}`;
  const buttonMode = `buttons ${isBreak ? 'break1' : 'work1'}`;
  return (
    <Layout className={backgroundMode}>
      <Header style={{background: 'transparent', marginTop: 5}}>
      </Header>
      <Content style={{marginTop: 0, height: 500}}>
        <Space direction='vertical' style={{border: '1px solid white',  boxShadow: '3px 3px #ccc'}}>
        <Title level={2} style={{color: 'white' , marginTop: 20}}>Pomodoro Clock</Title>
        <Space direction='vertical' className='time-now' style={{ display: 'flex' }}>{now.toLocaleTimeString()}</Space>
        <Space direction='vertical' className='message' style={{ display: 'flex' }}>{isBreak ? 'Break time' : 'Working time'}</Space>
        <Space direction='vertical' className='timer' style={{ display: 'flex' }}>{formatTime(secondsLeft)}</Space>
        <Space className='buttons' style={{ display: 'flex' }}>
          {!isRunning ? (
            <Button className={buttonMode} onClick={start}>
              Start
            </Button>
          ) : (
            <Button className={buttonMode} onClick={stop}>
              Stop
            </Button>
          )}
          <Button className={buttonMode} onClick={reset}>
            Reset
          </Button>
          <Button
            className={buttonMode}
            onClick={() => {
              !showSettings ? setShowSettings(true) : setShowSettings(false);
            }}
          >
            Settings
          </Button>
        </Space>
        <Space className='settings'>
          {showSettings && (
            <Form onSubmit={handleSettingsSubmit} className='timeSettings'>
              <Form.Item label='Working Time (minutes):' >
                <InputNumber
                  min={1}
                  max={60}
                  defaultValue={workingTime / 60}
                  onChange={handleWorkingTimeChange}
                />
              </Form.Item>
              <Form.Item label='Break Time (minutes):'>
                <InputNumber
                  min={1}
                  max={60}
                  defaultValue={breakTime / 60}
                  onChange={handleBreakTimeChange}
                />
              </Form.Item>
              <Form.Item>
                <Button className={buttonMode} type='default' htmlType='submit' onClick={() => {
                    !showSettings ? setShowSettings(true) : setShowSettings(false);
                }}>
                  Apply
                </Button>
              </Form.Item>
            </Form>
          )}
        </Space>
        </Space>
      </Content>
   <Layout>
    </Layout>
    </Layout>
  )}
export default Pomodoro