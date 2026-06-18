'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  BookOpen, 
  Users, 
  Plus, 
  Trash2, 
  Search, 
  Target,
  CheckCircle, 
  Award, 
  TrendingUp, 
  FileText, 
  User, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Calendar,
  Edit,
  Save,
  Check,
  X,
  Crown,
  Flag,
  Info,
  Settings
} from 'lucide-react';

// 초기 교사 명단
const INITIAL_TEACHERS = [
  { id: 't1', name: '김선교', phone: '010-1234-5678', role: '부장', status: '활동중' },
  { id: 't2', name: '이순종', phone: '010-8765-4321', role: '교관', status: '활동중' },
  { id: 't3', name: '박사랑', phone: '010-1111-2222', role: '정교사2', status: '활동중' },
  { id: 't4', name: '최믿음', phone: '010-3333-4444', role: '정교사1', status: '활동중' },
  { id: 't5', name: '정은혜', phone: '010-5555-6666', role: '예비교사', status: '활동중' }
];

// 최전방 특전대 초기 스프레드시트 템플릿
const INITIAL_FRONT_WEEKLY_SHEETS = {
  '2026-5-1': {
    id: 'sheet_f_5_1',
    year: '2026',
    month: '5',
    week: '1',
    startDate: '2026-05-04',
    members: [
      { name: '이서연', goals: { finding: 15, plucking: 8, gospel: 3 }, daily: { Mon: { finding: 1, plucking: 0, gospel: 0 }, Tue: { finding: 2, plucking: 0, gospel: 0 }, Wed: { finding: 1, plucking: 1, gospel: 0 }, Thu: { finding: 0, plucking: 0, gospel: 0 }, Fri: { finding: 4, plucking: 1, gospel: 1 }, Sat: { finding: 1, plucking: 0, gospel: 0 }, Sun: { finding: 2, plucking: 0, gospel: 0 } } },
      { name: '정혜원', goals: { finding: 15, plucking: 8, gospel: 3 }, daily: { Mon: { finding: 1, plucking: 1, gospel: 0 }, Tue: { finding: 0, plucking: 1, gospel: 0 }, Wed: { finding: 1, plucking: 0, gospel: 0 }, Thu: { finding: 0, plucking: 0, gospel: 0 }, Fri: { finding: 1, plucking: 0, gospel: 0 }, Sat: { finding: 0, plucking: 0, gospel: 0 }, Sun: { finding: 0, plucking: 0, gospel: 1 } } },
      { name: '강보라', goals: { finding: 15, plucking: 8, gospel: 3 }, daily: { Mon: { finding: 0, plucking: 0, gospel: 0 }, Tue: { finding: 6, plucking: 1, gospel: 0 }, Wed: { finding: 4, plucking: 2, gospel: 1 }, Thu: { finding: 2, plucking: 0, gospel: 0 }, Fri: { finding: 3, plucking: 0, gospel: 0 }, Sat: { finding: 5, plucking: 1, gospel: 1 }, Sun: { finding: 1, plucking: 0, gospel: 0 } } },
      { name: '국진영', goals: { finding: 15, plucking: 8, gospel: 3 }, daily: { Mon: { finding: 12, plucking: 2, gospel: 0 }, Tue: { finding: 8, plucking: 1, gospel: 1 }, Wed: { finding: 5, plucking: 1, gospel: 0 }, Thu: { finding: 10, plucking: 3, gospel: 0 }, Fri: { finding: 7, plucking: 2, gospel: 1 }, Sat: { finding: 4, plucking: 0, gospel: 0 }, Sun: { finding: 3, plucking: 1, gospel: 0 } } },
      { name: '박수지', goals: { finding: 15, plucking: 8, gospel: 3 }, daily: { Mon: { finding: 2, plucking: 0, gospel: 0 }, Tue: { finding: 0, plucking: 0, gospel: 0 }, Wed: { finding: 2, plucking: 1, gospel: 0 }, Thu: { finding: 5, plucking: 0, gospel: 1 }, Fri: { finding: 1, plucking: 1, gospel: 0 }, Sat: { finding: 3, plucking: 1, gospel: 0 }, Sun: { finding: 4, plucking: 0, gospel: 0 } } }
    ]
  },
  '2026-5-2': {
    id: 'sheet_f_5_2',
    year: '2026',
    month: '5',
    week: '2',
    startDate: '2026-05-11',
    members: [
      { name: '이서연', goals: { finding: 6, plucking: 3, gospel: 1 }, daily: { Mon: { finding: 0, plucking: 0, gospel: 0 }, Tue: { finding: 1, plucking: 1, gospel: 0 }, Wed: { finding: 1, plucking: 0, gospel: 0 }, Thu: { finding: 2, plucking: 0, gospel: 1 }, Fri: { finding: 0, plucking: 0, gospel: 0 }, Sat: { finding: 1, text: 'stroke', plucking: 0, gospel: 0 }, Sun: { finding: 2, plucking: 1, gospel: 0 } } },
      { name: '정혜원', goals: { finding: 6, plucking: 3, gospel: 1 }, daily: { Mon: { finding: 0, plucking: 0, gospel: 0 }, Tue: { finding: 1, plucking: 0, gospel: 0 }, Wed: { finding: 0, plucking: 1, gospel: 0 }, Thu: { finding: 0, plucking: 0, gospel: 0 }, Fri: { finding: 1, plucking: 0, gospel: 0 }, Sat: { finding: 0, plucking: 0, gospel: 1 }, Sun: { finding: 0, plucking: 0, gospel: 0 } } },
      { name: '강보라', goals: { finding: 6, plucking: 3, gospel: 1 }, daily: { Mon: { finding: 2, plucking: 1, gospel: 0 }, Tue: { finding: 0, plucking: 0, gospel: 0 }, Wed: { finding: 3, plucking: 1, gospel: 1 }, Thu: { finding: 1, text: 'stroke', plucking: 0, gospel: 0 }, Fri: { finding: 2, plucking: 1, gospel: 0 }, Sat: { finding: 4, plucking: 1, gospel: 0 }, Sun: { finding: 1, plucking: 0, gospel: 0 } } },
      { name: '국진영', goals: { finding: 6, plucking: 3, gospel: 1 }, daily: { Mon: { finding: 5, plucking: 1, gospel: 0 }, Tue: { finding: 4, plucking: 1, gospel: 0 }, Wed: { finding: 6, plucking: 2, gospel: 1 }, Thu: { finding: 12, plucking: 3, gospel: 0 }, Fri: { finding: 3, plucking: 1, gospel: 0 }, Sat: { finding: 4, plucking: 0, gospel: 0 }, Sun: { finding: 2, plucking: 0, gospel: 0 } } },
      { name: '박수지', goals: { finding: 6, plucking: 3, gospel: 1 }, daily: { Mon: { finding: 1, plucking: 0, gospel: 0 }, Tue: { finding: 0, plucking: 0, gospel: 0 }, Wed: { finding: 1, plucking: 1, gospel: 0 }, Thu: { finding: 3, plucking: 0, gospel: 1 }, Fri: { finding: 1, plucking: 0, gospel: 0 }, Sat: { finding: 2, plucking: 1, gospel: 0 }, Sun: { finding: 2, plucking: 0, gospel: 0 } } }
    ]
  }
};

// 후방 특전대 초기 스프레드시트 템플릿
const INITIAL_REAR_WEEKLY_SHEETS = {
  '2026-5-1': {
    id: 'sheet_r_5_1',
    year: '2026',
    month: '5',
    week: '1',
    startDate: '2026-05-04',
    members: [
      { name: '김태희', goals: { finding: 10, plucking: 5, gospel: 2 }, daily: { Mon: { finding: 1, plucking: 0, gospel: 0 }, Tue: { finding: 1, plucking: 1, gospel: 0 }, Wed: { finding: 2, plucking: 0, gospel: 0 }, Thu: { finding: 0, plucking: 0, gospel: 0 }, Fri: { finding: 2, plucking: 1, gospel: 1 }, Sat: { finding: 0, plucking: 0, gospel: 0 }, Sun: { finding: 1, plucking: 0, gospel: 0 } } },
      { name: '유재석', goals: { finding: 10, plucking: 5, gospel: 2 }, daily: { Mon: { finding: 0, plucking: 0, gospel: 0 }, Tue: { finding: 1, plucking: 1, gospel: 0 }, Wed: { finding: 1, plucking: 0, gospel: 0 }, Thu: { finding: 1, plucking: 0, gospel: 0 }, Fri: { finding: 0, plucking: 0, gospel: 0 }, Sat: { finding: 1, text: 'stroke', plucking: 0, gospel: 0 }, Sun: { finding: 0, plucking: 0, gospel: 1 } } },
      { name: '송중기', goals: { finding: 10, plucking: 5, gospel: 2 }, daily: { Mon: { finding: 2, plucking: 1, gospel: 0 }, Tue: { finding: 1, plucking: 0, gospel: 0 }, Wed: { finding: 1, plucking: 1, gospel: 1 }, Thu: { finding: 1, plucking: 0, gospel: 0 }, Fri: { finding: 1, plucking: 0, gospel: 0 }, Sat: { finding: 3, plucking: 1, gospel: 0 }, Sun: { finding: 0, plucking: 0, gospel: 0 } } },
      { name: '이광수', goals: { finding: 10, plucking: 5, gospel: 2 }, daily: { Mon: { finding: 3, plucking: 0, gospel: 0 }, Tue: { finding: 2, plucking: 1, gospel: 0 }, Wed: { finding: 1, plucking: 0, gospel: 0 }, Thu: { finding: 4, plucking: 2, gospel: 0 }, Fri: { finding: 2, plucking: 1, gospel: 1 }, Sat: { finding: 2, plucking: 0, gospel: 0 }, Sun: { finding: 1, plucking: 0, gospel: 0 } } }
    ]
  }
};

const INITIAL_GOSPEL_ROOMS = {
  '2026-06': [
    { id: 'g1', leader: '김선교', scout: '이섭외', country: '대한민국', date: '2026-06-10', phone: '010-1234-0001', countBB: 6, countSeminar: 2, status: '진행중', failReason: '', cardSubmitted: true, memo: '말씀과 양육 프로그램에 매우 우호적이며 피드백이 양호함.' },
    { id: 'g2', leader: '박사랑', scout: '최중보', country: '대한민국', date: '2026-06-14', phone: '010-5678-0002', countBB: 10, countSeminar: 4, status: '진행중', failReason: '', cardSubmitted: true, memo: '온라인 줌 연동 세미나 필수 이수중.' },
    { id: 'g3', leader: '최믿음', scout: '김영자', country: '대한민국', date: '2026-06-08', phone: '010-9999-0003', status: '탈락', failReason: '연락두절', cardSubmitted: false, memo: '개인적 사정으로 인한 소통 중지 상태임.' }
  ]
};

const INITIAL_DAILY_COUNTS = {
  '2026-06-16': { finding: 12, plucking: 4, gospel: 2 },
  '2026-06-15': { finding: 8, plucking: 2, gospel: 1 }
};

const INITIAL_EDUCATION_PROGRAMS = [
  { id: 'ep1', name: '사명자 모임', weekday: '월요일', participants: ['김선교', '이순종', '박사랑', '최믿음'], dates: ['2026-06-01', '2026-06-08', '2026-06-15'] },
  { id: 'ep2', name: '생명나무 핵심교재', weekday: '화요일', participants: ['이서연', '강보라', '국진영'], dates: ['2026-06-02', '2026-06-09', '2026-06-16'] },
  { id: 'ep3', name: '새신자 성장지도반', weekday: '목요일', participants: ['정혜원', '박수지'], dates: ['2026-06-04', '2026-06-11'] }
];

const INITIAL_EDUCATION_ATTENDANCE = {
  'ep1': {
    '2026-06-01': { '김선교': { attended: true }, '이순종': { attended: true }, '박사랑': { attended: true }, '최믿음': { attended: false, reason: '출장' } },
    '2026-06-08': { '김선교': { attended: true }, '이순종': { attended: true }, '박사랑': { attended: false, reason: '개인 사정' }, '최믿음': { attended: true } },
    '2026-06-15': { '김선교': { attended: true }, '이순종': { attended: false, reason: '몸살 감기' }, '박사랑': { attended: true }, '최믿음': { attended: true } }
  },
  'ep2': {
    '2026-06-02': { '이서연': { attended: true }, '강보라': { attended: true }, '국진영': { attended: false, reason: '야근' } },
    '2026-06-09': { '이서연': { attended: true }, '강보라': { attended: false, reason: '지하철 지연' }, '국진영': { attended: true } },
    '2026-06-16': { '이서연': { attended: true }, '강보라': { attended: true }, '국진영': { attended: true } }
  }
};

const INITIAL_COUNSELING_REPORTS = [
  { id: 'c1', dept: '광복부', date: '2026-06-16', dayOfWeek: '화요일', counselor: '김선교', target: '이서연', content: '심방 진행. 생명나무 주요 핵심 구절 전달하고 영적 상태 점검 완료.' },
  { id: 'c2', dept: '광복부', date: '2026-06-15', dayOfWeek: '월요일', counselor: '박사랑', target: '강보라', content: '전화 상담. 심경 변화에 따른 기도 후원 조율 완료.' },
  { id: 'c3', dept: '광복부', date: '2026-05-12', dayOfWeek: '화요일', counselor: '최믿음', target: '박수지', content: '가정 방문 심방. 예배 출석의 중요성을 일깨우고 말씀 처방 완료.' }
];

const INITIAL_TEACHER_MEETINGS = ['2026-06-16', '2026-06-10'];
const INITIAL_TEACHERS_ATTENDANCE = {
  '2026-06-16': {
    't1': { attended: true, reason: '' },
    't2': { attended: true, reason: '' },
    't3': { attended: false, reason: '회사 야근 근무' },
    't4': { attended: true, reason: '' },
    't5': { attended: false, reason: '개인 병원 진료 예약' }
  }
};

// 전역 요일 상수 및 정적 유틸리티 함수 정의 (ReferenceError 방지)
const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const getWeekdayName = (date: Date) => weekdays[date.getDay()];

const dateToYmd = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const calculateDdayStatus = (targetDateStr: string) => {
  const today = new Date();
  const target = new Date(targetDateStr);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return { label: "마감", daysText: `D-day: ${targetDateStr.substring(5).replace('-', '.')}`, style: "text-rose-500 font-bold" };
  } else if (diffDays === 0) {
    return { label: "D-Day", daysText: "D-Day", style: "text-amber-500 font-extrabold" };
  } else {
    return { label: `D-${diffDays}`, daysText: `${diffDays}일 남음`, style: "text-indigo-400 font-bold" };
  }
};

const getRateBadgeStyle = (rate: number) => {
  if (rate <= 0) return 'bg-[#1e293b] text-slate-500 border border-slate-800 text-center text-[10px] py-0.5 px-1 rounded font-bold';
  if (rate < 30) {
    return 'bg-rose-600/20 text-rose-400 border border-rose-500/30 text-center text-[10px] py-0.5 px-1 rounded font-bold';
  } else if (rate >= 100) {
    return 'bg-blue-600/20 text-blue-400 border border-blue-500/30 text-center text-[10px] py-0.5 px-1 rounded font-bold';
  } else {
    return 'bg-amber-500/10 text-amber-300 border border-amber-400/20 text-center text-[10px] py-0.5 px-1 rounded font-bold';
  }
};

export default function App() {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [frontWeeklySheets, setFrontWeeklySheets] = useState(INITIAL_FRONT_WEEKLY_SHEETS);
  const [rearWeeklySheets, setRearWeeklySheets] = useState(INITIAL_REAR_WEEKLY_SHEETS);

  const [activeSfType, setActiveSfType] = useState('front');

  const [gospelRooms, setGospelRooms] = useState(INITIAL_GOSPEL_ROOMS);
  const [dailyCounts, setDailyCounts] = useState(INITIAL_DAILY_COUNTS);
  const [educationPrograms, setEducationPrograms] = useState(INITIAL_EDUCATION_PROGRAMS);
  const [educationAttendance, setEducationAttendance] = useState(INITIAL_EDUCATION_ATTENDANCE);

  const [counselingReports, setCounselingReports] = useState(INITIAL_COUNSELING_REPORTS);

  const [teacherMeetings, setTeacherMeetings] = useState(INITIAL_TEACHER_MEETINGS);

  const [teachersAttendance, setTeachersAttendance] = useState(INITIAL_TEACHERS_ATTENDANCE);

const [sfCenterGoals, setSfCenterGoals] = useState({
    card: { text: "20", sub: "각 5장", score: 20 },
    gospel: { text: "50", sub: "각 10건", score: 50 },
    plucking: { text: "100", sub: "각 20건", score: 100 },
    finding: { text: "200", sub: "각 40건", score: 200 }
  });

  const [sfDdays, setSfDdays] = useState([
    { id: 'd1', country: '칠레', date: '2026-04-29', center: '대면센터' },
    { id: 'd2', country: '아르헨티나', date: '2026-05-02', center: '대면센터' },
    { id: 'd3', country: '콜롬비아(CO)SUBA', date: '2026-05-16', center: '대면센터' }
  ]);

  const [counselingGoals, setCounselingGoals] = useState({
    '2026-06': 8,
    '2026-05': 5
  });

  // 심방 관리 전용 활성화 연월 상태
  const [activeCounselingYm, setActiveCounselingYm] = useState('2026-06');

  
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 16)); // 2026-06-16 기준
  const [toast, setToast] = useState({ open: false, message: '' });
  const [activeGospelMonth, setActiveGospelMonth] = useState('2026-06');
  const [searchText, setSearchText] = useState('');

  // 특전대 전도대장 년/월 스위처 상태
  const [activeSfYear, setActiveSfYear] = useState('2026');
  const [activeSfMonth, setActiveSfMonth] = useState('5');

  // 디데이 추가 입력을 위한 상태
  const [newDdayCountry, setNewDdayCountry] = useState('');
  const [newDdayDate, setNewDdayDate] = useState('');
  const [newDdayCenter, setNewDdayCenter] = useState('대면센터');

  // 신규 주간 대장 신설 전용 모달 상태
  const [isNewWeekModalOpen, setIsNewWeekModalOpen] = useState(false);
  const [newWeekNumInput, setNewWeekNumInput] = useState('3');
  const [newWeekStartInput, setNewWeekStartInput] = useState('2026-05-18');

  // 복음방 다중 필터
  const [gospelFilters, setGospelFilters] = useState({
    leader: '전체',
    country: '전체',
    status: '전체',
    cardSubmitted: '전체'
  });

  // 모달 및 서브 창 관리
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);
  const [isNewMonthModalOpen, setIsNewMonthModalOpen] = useState(false);
  const [selectedCounselingDetail, setSelectedCounselingDetail] = useState(null);
  const [activeEduProgramModal, setActiveEduProgramModal] = useState(null);
  const [selectedEduStudent, setSelectedEduStudent] = useState(null);

  // 대시보드 하단 심방 전용 표 모달 & 심방 수정 전용 모달
  const [selectedCounselingRecord, setSelectedCounselingRecord] = useState(null);
  const [editingCounseling, setEditingCounseling] = useState(null);

  // 요원 전도수치 팝업식 전용 모달
  const [agentInputModal, setAgentInputModal] = useState({
    open: false,
    sheetId: '',
    memberName: ''
  });

  // 심방 관리 자체 검색/필터 상태
  const [counselingSearchText, setCounselingSearchText] = useState('');

  const showToast = (msg) => {
    setToast({ open: true, message: msg });
    setTimeout(() => setToast({ open: false, message: '' }), 2500);
  };

  const currentSelectedYmd = dateToYmd(currentDate);

  const calendarCells = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push({ empty: true });
    }

    for (let d = 1; d <= days; d++) {
      const dateObj = new Date(year, month, d);
      const ymd = dateToYmd(dateObj);
      const dayCounselings = counselingReports.filter(rep => rep.date === ymd);
      
      cells.push({
        empty: false,
        dayNum: d,
        ymd,
        counselings: dayCounselings
      });
    }
    return cells;
  }, [currentDate, counselingReports]);

  // 통합 주간 데이터 가져오기 (최전방 / 후방에 따라 스위칭)
  const currentSfWeeklySheets = useMemo(() => {
    return activeSfType === 'front' ? frontWeeklySheets : rearWeeklySheets;
  }, [activeSfType, frontWeeklySheets, rearWeeklySheets]);

  const setSfWeeklySheets = (updater) => {
    if (activeSfType === 'front') {
      setFrontWeeklySheets(prev => {
        const nextVal = typeof updater === 'function' ? updater(prev) : updater;
        return nextVal;
      });
    } else {
      setRearWeeklySheets(prev => {
        const nextVal = typeof updater === 'function' ? updater(prev) : updater;
        return nextVal;
      });
    }
  };

  const dashboardStats = useMemo(() => {
    const activeRooms = gospelRooms[activeGospelMonth] || [];
    const total = activeRooms.length;
    const submitted = activeRooms.filter(r => r.cardSubmitted).length;
    const rate = total > 0 ? Math.round((submitted / total) * 100) : 0;
    return { activeRoomsCount: total, submittedCards: submitted, cardSubmissionRate: rate };
  }, [gospelRooms, activeGospelMonth]);

  // 지정 달의 심방 목표 추출 키
  const currentYearMonthKey = useMemo(() => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  }, [currentDate]);

  const currentMonthCounselingGoal = useMemo(() => {
    return counselingGoals[activeCounselingYm] || 8;
  }, [counselingGoals, activeCounselingYm]);

  // 4대 성과 지표 (찾기, 따기, 복음방, 카드제출) 및 심방, 교육 달성도 실시간 연산 (100% 초과 제한 없음)
  const performancePercentages = useMemo(() => {
    // 1. 전도 부문 누적 실제수치 연산
    let totalFindingActual = 0;
    let totalPluckingActual = 0;
    let totalGospelActual = 0;

    const accumSheets = (sheets) => {
      Object.values(sheets).forEach(sheet => {
        if (String(sheet.year) === activeSfYear && String(sheet.month) === activeSfMonth) {
          sheet.members.forEach(m => {
            ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
              totalFindingActual += (m.daily[day]?.finding || 0);
              totalPluckingActual += (m.daily[day]?.plucking || 0);
              totalGospelActual += (m.daily[day]?.gospel || 0);
            });
          });
        }
      });
    };
    accumSheets(frontWeeklySheets);
    accumSheets(rearWeeklySheets);

    // 목표치 파싱
    const totalTargetFinding = parseInt(sfCenterGoals.finding.text) || 200;
    const totalTargetPlucking = parseInt(sfCenterGoals.plucking.text) || 100;
    const totalTargetGospel = parseInt(sfCenterGoals.gospel.text) || 50;
    const totalTargetCard = parseInt(sfCenterGoals.card.text) || 20;

    // 복음방 카드 제출 실제 건수 산출
    const currentMonthGospelRooms = gospelRooms[activeGospelMonth] || [];
    const totalCardActual = currentMonthGospelRooms.filter(r => r.cardSubmitted).length;

    // 비율 (100% 한계 해제)
    const findingRate = totalTargetFinding > 0 ? Math.round((totalFindingActual / totalTargetFinding) * 100) : 0;
    const pluckingRate = totalTargetPlucking > 0 ? Math.round((totalPluckingActual / totalTargetPlucking) * 100) : 0;
    const gospelRate = totalTargetGospel > 0 ? Math.round((totalGospelActual / totalTargetGospel) * 100) : 0;
    const cardRate = totalTargetCard > 0 ? Math.round((totalCardActual / totalTargetCard) * 100) : 0;

    // 2. 심방 (Counseling) 달성률 (동적 목표 반영, 100% 한계 해제)
    const targetCounselingCount = counselingGoals[activeCounselingYm] || 8;
    const currentMonthCounselings = counselingReports.filter(c => c.date.startsWith(activeCounselingYm));
    const counselingRate = targetCounselingCount > 0 ? Math.round((currentMonthCounselings.length / targetCounselingCount) * 100) : 0;

    // 3. 교육 (Education) 달성률
    let totalClasses = 0;
    let totalAttRateSum = 0;

    educationPrograms.forEach(prog => {
      prog.dates.forEach(date => {
        const fillMap = educationAttendance[prog.id]?.[date] || {};
        const members = prog.participants;
        if (members.length > 0) {
          const presentCount = members.filter(m => fillMap[m]?.attended === true).length;
          totalClasses++;
          totalAttRateSum += (presentCount / members.length) * 100;
        }
      });
    });

    const educationRate = totalClasses > 0 ? Math.round(totalAttRateSum / totalClasses) : 75;

    return {
      finding: findingRate,
      findingCount: totalFindingActual,
      findingGoal: totalTargetFinding,

      plucking: pluckingRate,
      pluckingCount: totalPluckingActual,
      pluckingGoal: totalTargetPlucking,

      gospel: gospelRate,
      gospelCount: totalGospelActual,
      gospelGoal: totalTargetGospel,

      card: cardRate,
      cardCount: totalCardActual,
      cardGoal: totalTargetCard,

      counseling: counselingRate,
      counselingCount: currentMonthCounselings.length,
      counselingGoal: targetCounselingCount,
      education: educationRate
    };
  }, [frontWeeklySheets, rearWeeklySheets, activeSfYear, activeSfMonth, sfCenterGoals, gospelRooms, activeGospelMonth, counselingReports, educationPrograms, educationAttendance, activeCounselingYm, counselingGoals]);

  const selectedDateEduInfo = useMemo(() => {
    const matchedProgs = educationPrograms.filter(prog => prog.dates.includes(currentSelectedYmd));
    return matchedProgs.map(prog => {
      const attMap = educationAttendance[prog.id]?.[currentSelectedYmd] || {};
      const total = prog.participants.length;
      
      const presentCount = prog.participants.filter(name => {
        const record = attMap[name];
        if (typeof record === 'boolean') return record;
        return record?.attended === true;
      }).length;

      const rate = total > 0 ? Math.round((presentCount / total) * 100) : 0;
      return { id: prog.id, name: prog.name, presentCount, total, rate };
    });
  }, [currentDate, educationPrograms, educationAttendance, currentSelectedYmd]);

  const activeDailyCounts = dailyCounts[currentSelectedYmd] || { finding: 0, plucking: 0, gospel: 0 };

  const handleUpdateDailyCount = (field, value) => {
    const num = Math.max(0, parseInt(value) || 0);
    setDailyCounts(prev => ({
      ...prev,
      [currentSelectedYmd]: {
        ...(prev[currentSelectedYmd] || { finding: 0, plucking: 0, gospel: 0 }),
        [field]: num
      }
    }));
  };

  const activeMonthGospelList = gospelRooms[activeGospelMonth] || [];
  const uniqueGospelLeaders = useMemo(() => ['전체', ...new Set(activeMonthGospelList.map(item => item.leader))], [activeMonthGospelList]);
  const uniqueGospelCountries = useMemo(() => ['전체', ...new Set(activeMonthGospelList.map(item => item.country))], [activeMonthGospelList]);

  const filteredGospelList = useMemo(() => {
    return activeMonthGospelList.filter(item => {
      const matchLeader = gospelFilters.leader === '전체' || item.leader === gospelFilters.leader;
      const matchCountry = gospelFilters.country === '전체' || item.country === gospelFilters.country;
      const matchStatus = gospelFilters.status === '전체' || item.status === gospelFilters.status;
      const matchCard = gospelFilters.cardSubmitted === '전체' || (gospelFilters.cardSubmitted === 'O' ? item.cardSubmitted : !item.cardSubmitted);
      const matchSearch = item.leader.includes(searchText) || item.scout.includes(searchText) || (item.memo && item.memo.includes(searchText));
      return matchLeader && matchCountry && matchStatus && matchCard && matchSearch;
    });
  }, [activeMonthGospelList, gospelFilters, searchText]);

  const gospelAggregates = useMemo(() => {
    const total = filteredGospelList.length;
    const totalBB = filteredGospelList.reduce((sum, item) => sum + (item.countBB || 0), 0);
    const totalSeminar = filteredGospelList.reduce((sum, item) => sum + (item.countSeminar || 0), 0);
    const cards = filteredGospelList.filter(item => item.cardSubmitted).length;
    const cardRate = total > 0 ? Math.round((cards / total) * 100) : 0;
    const inProgress = filteredGospelList.filter(item => item.status === '진행중').length;
    const failed = filteredGospelList.filter(item => item.status === '탈락').length;
    return { total, totalBB, totalSeminar, cards, cardRate, inProgress, failed };
  }, [filteredGospelList]);

  const handleUpdateGospelRow = (id, field, value) => {
    setGospelRooms(prev => {
      const updated = prev[activeGospelMonth].map(row => {
        if (row.id === id) {
          const uRow = { ...row, [field]: value };
          if (field === 'status' && value === '진행중') {
            uRow.failReason = '';
          }
          return uRow;
        }
        return row;
      });
      return { ...prev, [activeGospelMonth]: updated };
    });
  };

  const handleToggleEduAttendanceDirect = (progId, date, participant, currentVal) => {
    setEducationAttendance(prev => {
      const progData = prev[progId] || {};
      const dateData = progData[date] || {};
      const currentRecord = dateData[participant] || {};
      
      return {
        ...prev,
        [progId]: {
          ...progData,
          [date]: { 
            ...dateData, 
            [participant]: { 
              attended: !currentVal, 
              reason: !currentVal ? '' : (currentRecord.reason || '') 
            } 
          }
        }
      };
    });
  };

  const handleUpdateEduReason = (progId, date, participant, text) => {
    setEducationAttendance(prev => {
      const progData = prev[progId] || {};
      const dateData = progData[date] || {};
      const currentRecord = dateData[participant] || { attended: false };
      return {
        ...prev,
        [progId]: {
          ...progData,
          [date]: {
            ...dateData,
            [participant]: { ...currentRecord, reason: text }
          }
        }
      };
    });
  };

  const handleAddEduDateAutomated = (progId) => {
    const prog = educationPrograms.find(p => p.id === progId);
    if (!prog) return;

    const targetDayNum = {
      '일요일': 0, '월요일': 1, '화요일': 2, '수요일': 3, '목요일': 4, '금요일': 5, '토요일': 6
    }[prog.weekday] ?? 1;

    let nextDateStr = '';
    if (prog.dates && prog.dates.length > 0) {
      const sortedDates = [...prog.dates].sort();
      const latestDateStr = sortedDates[sortedDates.length - 1];
      const latestDate = new Date(latestDateStr);
      latestDate.setDate(latestDate.getDate() + 7);
      nextDateStr = dateToYmd(latestDate);
    } else {
      const start = new Date(2026, 5, 16); // 오늘 기준
      const currentDayNum = start.getDay();
      let diff = targetDayNum - currentDayNum;
      if (diff <= 0) diff += 7;
      start.setDate(start.getDate() + diff);
      nextDateStr = dateToYmd(start);
    }

    setEducationPrograms(prev => prev.map(p => {
      if (p.id === progId) {
        if (p.dates.includes(nextDateStr)) {
          return p;
        }
        return { ...p, dates: [...p.dates, nextDateStr].sort() };
      }
      return p;
    }));

    if (activeEduProgramModal && activeEduProgramModal.id === progId) {
      setActiveEduProgramModal(prev => {
        if (prev.dates.includes(nextDateStr)) return prev;
        return { ...prev, dates: [...prev.dates, nextDateStr].sort() };
      });
    }

    showToast(`📅 다음 주 ${prog.weekday} (${nextDateStr}) 일자가 출석부에 자동 개설되었습니다.`);
  };

  const handleRemoveEduDate = (progId, date) => {
    setEducationPrograms(prev => prev.map(prog => {
      if (prog.id === progId) {
        return { ...prog, dates: prog.dates.filter(d => d !== date) };
      }
      return prog;
    }));
    showToast('🗑️ 지정된 세션 날짜가 삭제되었습니다.');
  };

  const filteredSheetsForMonth = useMemo(() => {
    return Object.values(currentSfWeeklySheets)
      .filter(sheet => String(sheet.year) === String(activeSfYear) && String(sheet.month) === String(activeSfMonth))
      .sort((a, b) => parseInt(a.week) - parseInt(b.week));
  }, [currentSfWeeklySheets, activeSfYear, activeSfMonth]);

  const monthlyAggregatedStats = useMemo(() => {
    const defaultMembers = activeSfType === 'front' 
      ? ['이서연', '정혜원', '강보라', '국진영', '박수지']
      : ['김태희', '유재석', '송중기', '이광수'];
      
    const result = {};
    
    defaultMembers.forEach(name => {
      result[name] = {
        name,
        finding: { goal: 40, actual: 0 },
        plucking: { goal: 20, actual: 0 },
        gospel: { goal: 10, actual: 0 },
        cards: 0
      };
    });

    filteredSheetsForMonth.forEach(sheet => {
      sheet.members.forEach(m => {
        if (result[m.name]) {
          result[m.name].finding.goal = m.goals.finding * 3;
          result[m.name].plucking.goal = m.goals.plucking * 3;
          result[m.name].gospel.goal = m.goals.gospel * 3;

          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
            const dayData = m.daily[day] || { finding: 0, plucking: 0, gospel: 0 };
            result[m.name].finding.actual += (dayData.finding || 0);
            result[m.name].plucking.actual += (dayData.plucking || 0);
            result[m.name].gospel.actual += (dayData.gospel || 0);
          });
          result[m.name].cards = Math.floor(result[m.name].gospel.actual / 2); 
        }
      });
    });

    return Object.values(result);
  }, [filteredSheetsForMonth, activeSfType]);

  const computedTopRankings = useMemo(() => {
    return monthlyAggregatedStats.map(item => {
      const f = item.finding.actual;
      const p = item.plucking.actual;
      const g = item.gospel.actual;
      const fScore = Math.floor(f / 40) * 200 + (f % 40) * 5;
      const pScore = Math.floor(p / 20) * 100 + (p % 20) * 5;
      const gScore = Math.floor(g / 10) * 50 + (g % 10) * 5;
      const totalScore = fScore + pScore + gScore;

      return { name: item.name, totalScore, finding: f, plucking: p, gospel: g };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, [monthlyAggregatedStats]);

  const handleCellChange = (sheetId, memberName, day, field, val) => {
    const parsedVal = Math.max(0, parseInt(val) || 0);
    setSfWeeklySheets(prev => {
      const copy = { ...prev };
      const sheetKey = Object.keys(copy).find(k => copy[k].id === sheetId);
      if (!sheetKey) return prev;

      const targetSheet = copy[sheetKey];
      const updatedMembers = targetSheet.members.map(m => {
        if (m.name === memberName) {
          return {
            ...m,
            daily: {
              ...m.daily,
              [day]: {
                ...(m.daily[day] || { finding: 0, plucking: 0, gospel: 0 }),
                [field]: parsedVal
              }
            }
          };
        }
        return m;
      });

      copy[sheetKey] = { ...targetSheet, members: updatedMembers };
      return copy;
    });
  };

  const handleGoalChange = (sheetId, memberName, field, val) => {
    const parsedVal = Math.max(0, parseInt(val) || 0);
    setSfWeeklySheets(prev => {
      const copy = { ...prev };
      const sheetKey = Object.keys(copy).find(k => copy[k].id === sheetId);
      if (!sheetKey) return prev;

      const targetSheet = copy[sheetKey];
      const updatedMembers = targetSheet.members.map(m => {
        if (m.name === memberName) {
          return {
            ...m,
            goals: { ...m.goals, [field]: parsedVal }
          };
        }
        return m;
      });

      copy[sheetKey] = { ...targetSheet, members: updatedMembers };
      return copy;
    });
  };

  const handleNavigateSfMonth = (direction) => {
    let currentY = parseInt(activeSfYear);
    let currentM = parseInt(activeSfMonth);

    if (direction === 'prev') {
      currentM -= 1;
      if (currentM < 1) {
        currentM = 12;
        currentY -= 1;
      }
    } else {
      currentM += 1;
      if (currentM > 12) {
        currentM = 1;
        currentY += 1;
      }
    }

    setActiveSfYear(String(currentY));
    setActiveSfMonth(String(currentM));
  };

  const handleAddSfMonth = () => {
    const yearStr = window.confirm(`현재 년도: ${activeSfYear} — 다음 년도로 이동하시겠습니까?`) ? String(Number(activeSfYear) + 1) : activeSfYear;
    const monthStr = String(Number(activeSfMonth) % 12 + 1);
    setActiveSfYear(yearStr);
    setActiveSfMonth(monthStr);
    showToast(`📅 [${yearStr}년 ${monthStr}월] 전도 관리 대장이 새로 지정되었습니다.`);
  };

  const handleAddWeeklySheetDirect = () => {
    const key = `${activeSfYear}-${activeSfMonth}-${newWeekNumInput}`;
    const defaultNames = activeSfType === 'front' 
      ? ['이서연', '정혜원', '강보라', '국진영', '박수지']
      : ['김태희', '유재석', '송중기', '이광수'];

    const defaultMembers = defaultNames.map(name => ({
      name,
      goals: { finding: 15, plucking: 8, gospel: 3 },
      daily: {
        Mon: { finding: 0, plucking: 0, gospel: 0 },
        Tue: { finding: 0, plucking: 0, gospel: 0 },
        Wed: { finding: 0, plucking: 0, gospel: 0 },
        Thu: { finding: 0, plucking: 0, gospel: 0 },
        Fri: { finding: 0, plucking: 0, gospel: 0 },
        Sat: { finding: 0, plucking: 0, gospel: 0 },
        Sun: { finding: 0, plucking: 0, gospel: 0 }
      }
    }));

    setSfWeeklySheets(prev => ({
      ...prev,
      [key]: {
        id: 'sheet_' + Date.now(),
        year: activeSfYear,
        month: activeSfMonth,
        week: newWeekNumInput,
        startDate: newWeekStartInput,
        members: defaultMembers
      }
    }));

    setIsNewWeekModalOpen(false);
    showToast(`📂 [${activeSfMonth}월 ${newWeekNumInput}주차] 대장이 신규 개설되었습니다.`);
  };

  const handleUpdateCenterGoal = (key, field, val) => {
    setSfCenterGoals(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: val
      }
    }));
  };

  const handleAddDday = () => {
    if (!newDdayCountry || !newDdayDate) {
      showToast('⚠️ 국가와 디데이 대상 날짜를 모두 입력해주세요.');
      return;
    }
    const newDay = {
      id: 'd_' + Date.now(),
      country: newDdayCountry,
      date: newDdayDate,
      center: newDdayCenter
    };
    setSfDdays(prev => [...prev, newDay]);
    setNewDdayCountry('');
    setNewDdayDate('');
    showToast(`📍 [${newDdayCountry}] 선교지 일정이 등록되었습니다.`);
  };

  const handleRemoveDday = (id) => {
    setSfDdays(prev => prev.filter(d => d.id !== id));
    showToast('🗑️ 디데이가 목록에서 제외되었습니다.');
  };

  const handleOpenAgentInput = (sheetId, memberName) => {
    setAgentInputModal({
      open: true,
      sheetId,
      memberName
    });
  };

  const activeAgentData = useMemo(() => {
    if (!agentInputModal.open) return null;
    const sheet = currentSfWeeklySheets[Object.keys(currentSfWeeklySheets).find(k => currentSfWeeklySheets[k].id === agentInputModal.sheetId)];
    if (!sheet) return null;
    const member = sheet.members.find(m => m.name === agentInputModal.memberName);
    return {
      sheetId: agentInputModal.sheetId,
      memberName: agentInputModal.memberName,
      sheetTitle: `${sheet.month}월 ${sheet.week}주차`,
      member
    };
  }, [agentInputModal, currentSfWeeklySheets]);

  // 심방 관리 자체 필터링 결과
  const filteredCounselingReports = useMemo(() => {
    return counselingReports.filter(rep => {
      const matchMonth = rep.date.startsWith(activeCounselingYm);
      const matchSearch = 
        rep.target.includes(counselingSearchText) || 
        rep.counselor.includes(counselingSearchText) || 
        rep.content.includes(counselingSearchText);
      return matchMonth && matchSearch;
    });
  }, [counselingReports, activeCounselingYm, counselingSearchText]);

  // 심방 관리 전용 월 이동 함수
  const handleNavigateCounselingMonth = (direction) => {
    const [year, month] = activeCounselingYm.split('-').map(Number);
    let newYear = year;
    let newMonth = month;
    if (direction === 'prev') {
      newMonth -= 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
    } else {
      newMonth += 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    }
    const nextYm = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    setActiveCounselingYm(nextYm);
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 overflow-hidden font-sans relative">

      {/* TOAST ALERTS */}
      {toast.open && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-slate-900 border border-slate-700 text-slate-100 px-5 py-3 rounded-xl shadow-2xl">
          <Info className="mr-2.5 h-4 w-4 text-orange-400" />
          <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-700 bg-slate-900/30">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl shadow-lg">
              <Users className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xs font-black tracking-tight text-white flex items-center gap-1 leading-none">
                <span>광복부 통합 관리 시스템</span>
              </h1>
              <span className="text-[9px] text-slate-400 font-bold tracking-widest block mt-1 uppercase">TREE OF LIFE SYSTEM</span>
            </div>
          </div>
        </div>

        {/* MENUS (라우팅 바인딩 교정) */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setActiveMenu('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="flex-1 text-left">종합 대시보드</span>
          </button>

          <button 
            onClick={() => setActiveMenu('specialForce')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'specialForce' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
          >
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            <span className="flex-1 text-left">특전대 관리</span>
          </button>

          <button 
            onClick={() => setActiveMenu('gospelRoom')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'gospelRoom' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span className="flex-1 text-left">월별 복음방</span>
          </button>

          <button 
            onClick={() => setActiveMenu('education')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'education' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <TrendingUp className="h-4 w-4 text-indigo-400" />
            <span className="flex-1 text-left">교육 출석부</span>
          </button>

          <button 
            onClick={() => setActiveMenu('counseling')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'counseling' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <FileText className="h-4 w-4 text-rose-400" />
            <span className="flex-1 text-left">심방 관리</span>
          </button>

          <button 
            onClick={() => setActiveMenu('attendance')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeMenu === 'attendance' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users className="h-4 w-4 text-sky-400" />
            <span className="flex-1 text-left">교사 출석부</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-900/40 text-[9px] text-slate-500 text-center font-bold">
          Tree of Life System v11
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0f172a] overflow-hidden">
        <header className="h-16 border-b border-slate-700 bg-slate-900/50 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-2.5">
            <span className="bg-slate-800 text-slate-300 text-[10px] px-3 py-1 rounded-full font-black border border-slate-700 flex items-center gap-1.5">
              대한민국 광복부 통합 관리 시스템
            </span>
          </div>
          <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-400" />
            <span>선택 일자:</span> 
            <span className="text-white font-extrabold">{currentSelectedYmd}</span> 
            <span className="text-[11px] text-slate-500">({getWeekdayName(currentDate)})</span>
          </div>
        </header>

        {/* CONTENTS AREA */}
        <div className="flex-1 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD VIEW */}
          {activeMenu === 'dashboard' && (
            <div className="p-6 space-y-6">
              
              {/* TOP COMPACT CARDS & GOSPEL ROOM RATE */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 px-5 py-4 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-emerald-400" />
                      <span>당월 활성 복음방 수 ({activeGospelMonth})</span>
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-3xl font-black text-white">{dashboardStats.activeRoomsCount}</span>
                      <span className="text-xs text-emerald-400 font-bold">개 복음방 가동</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 px-5 py-4 rounded-2xl flex items-center justify-between shadow-lg">
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span>복음방 카드 제출률 (%)</span>
                    </h3>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-3xl font-black text-blue-400">{dashboardStats.cardSubmissionRate}%</span>
                      <span className="text-xs text-slate-400 font-medium">({dashboardStats.submittedCards} / {dashboardStats.activeRoomsCount}건 완료)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 CORE SACRED METRICS PROGRESS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3.5 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Search className="h-3.5 w-3.5 text-blue-400" /> <span>찾기 목표 대비 실적</span>
                    </h4>
                    <span className="text-xs font-black text-blue-400">{performancePercentages.finding}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-2xl font-black text-white">{performancePercentages.findingCount}건</span>
                      <span className="text-[10px] text-slate-500">목표: {performancePercentages.findingGoal}건</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${performancePercentages.finding >= 100 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-blue-600'}`}
                        style={{ width: `${Math.min(100, performancePercentages.finding)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3.5 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5 text-amber-500" /> <span>따기 목표 대비 실적</span>
                    </h4>
                    <span className="text-xs font-black text-amber-400">{performancePercentages.plucking}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-2xl font-black text-white">{performancePercentages.pluckingCount}건</span>
                      <span className="text-[10px] text-slate-500">목표: {performancePercentages.pluckingGoal}건</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${performancePercentages.plucking >= 100 ? 'bg-gradient-to-r from-amber-450 to-orange-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.6)]' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(100, performancePercentages.plucking)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3.5 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-emerald-450" /> <span>복음방 목표 대비 실적</span>
                    </h4>
                    <span className="text-xs font-black text-emerald-450">{performancePercentages.gospel}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-2xl font-black text-white">{performancePercentages.gospelCount}건</span>
                      <span className="text-[10px] text-slate-500">목표: {performancePercentages.gospelGoal}건</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${performancePercentages.gospel >= 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, performancePercentages.gospel)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3.5 shadow-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-indigo-400" /> <span>카드제출 목표 대비 실적</span>
                    </h4>
                    <span className="text-xs font-black text-indigo-400">{performancePercentages.card}%</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-2xl font-black text-white">{performancePercentages.cardCount}건</span>
                      <span className="text-[10px] text-slate-500">목표: {performancePercentages.cardGoal}건</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${performancePercentages.card >= 100 ? 'bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]' : 'bg-indigo-600'}`}
                        style={{ width: `${Math.min(100, performancePercentages.card)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CALENDAR ROW */}
              <div className="grid grid-cols-12 gap-6">
                <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl col-span-7 flex flex-col justify-between h-[360px] relative">
                  <div className="flex justify-between items-center mb-3 shrink-0">
                    <h3 className="text-xs font-black text-white flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-indigo-400" /> <span>출결 및 활동 캘린더</span>
                    </h3>
                    <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
                      <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15))} className="px-2.5 py-1 hover:bg-slate-800 rounded font-bold text-slate-400">◀</button>
                      <span className="font-black text-slate-200 px-2">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
                      <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15))} className="px-2.5 py-1 hover:bg-slate-800 rounded font-bold text-slate-400">▶</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-500 shrink-0 mb-2 uppercase">
                    <div className="text-rose-400">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div className="text-indigo-455">토</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 flex-1 overflow-y-auto">
                    {calendarCells.map((cell, idx) => {
                      if (cell.empty) return <div key={`empty-${idx}`} className="h-12 bg-slate-900/10 rounded-xl border border-transparent"></div>;
                      const isSelected = currentDate.getDate() === cell.dayNum;
                      return (
                        <button
                          key={`cell-${cell.dayNum}`}
                          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), cell.dayNum))}
                          className={`h-12 p-1.5 rounded-xl border flex flex-col justify-between items-start text-left transition-all overflow-hidden ${isSelected ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md' : 'bg-slate-900/45 border-slate-800 hover:border-slate-700 text-slate-300'}`}
                        >
                          <span className="text-[10px] font-bold">{cell.dayNum}</span>
                          <div className="w-full flex flex-col items-end">
                            {cell.counselings.length > 0 && (
                              <span className="bg-rose-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded-md scale-90 origin-right">심방 {cell.counselings.length}</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SIDE CONTROL */}
                <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl col-span-5 flex flex-col justify-between h-[360px] overflow-hidden">
                  <div className="pb-2 border-b border-slate-800 shrink-0 flex items-center justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">선택 일자 세션 정보 제어</h4>
                      <h3 className="text-xs font-black text-white mt-0.5">{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 {currentDate.getDate()}일 ({getWeekdayName(currentDate)})</h3>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2 shrink-0">
                    <h5 className="text-[10px] font-bold text-slate-400">📊 당일 전도 실적 입력</h5>
                    <div className="grid grid-cols-3 gap-2 text-[10px]">
                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 flex flex-col items-center">
                        <label className="text-slate-400 font-bold block mb-1 flex items-center gap-1"><Search className="h-3 w-3" /> <span>찾기</span></label>
                        <input type="number" value={activeDailyCounts.finding} onChange={(e) => handleUpdateDailyCount('finding', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-black text-white text-[11px]" />
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 flex flex-col items-center">
                        <label className="text-slate-400 font-bold block mb-1 flex items-center gap-1"><Target className="h-3 w-3" /> <span>따기</span></label>
                        <input type="number" value={activeDailyCounts.plucking} onChange={(e) => handleUpdateDailyCount('plucking', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-black text-white text-[11px]" />
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-800 flex flex-col items-center">
                        <label className="text-slate-400 font-bold block mb-1 flex items-center gap-1"><BookOpen className="h-3 w-3" /> <span>복음방</span></label>
                        <input type="number" value={activeDailyCounts.gospel} onChange={(e) => handleUpdateDailyCount('gospel', e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-black text-white text-[11px]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1.5 flex-1 overflow-hidden flex flex-col">
                    <h5 className="text-[10px] font-bold text-slate-400">🎓 당일 배정 교육 과정 및 참여율</h5>
                    <div className="space-y-1 overflow-y-auto flex-1 pr-1">
                      {selectedDateEduInfo.length === 0 ? (
                        <div className="text-[10px] text-slate-500 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 text-center">배정된 정기 교육 과정이 없습니다.</div>
                      ) : (
                        selectedDateEduInfo.map(edu => (
                          <div key={edu.id} className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex justify-between items-center text-[11px]">
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
                              <div>
                                <span className="font-bold text-white block truncate w-36">{edu.name}</span>
                                <span className="text-[9px] text-slate-400">출석: {edu.presentCount}명 / {edu.total}명</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded-lg border border-indigo-900/30">{edu.rate}%</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-2 shrink-0 border-t border-slate-855 pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1"><FileText className="h-3 w-3" /> <span>당일 심방 대상 목록</span></h5>
                      <button onClick={() => setIsCounselingModalOpen(true)} className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-[9px] font-bold px-2 py-1 rounded-lg">+ 심방 등록</button>
                    </div>
                    <div className="space-y-1 max-h-[80px] overflow-y-auto">
                      {counselingReports.filter(c => c.date === currentSelectedYmd).length === 0 ? (
                        <div className="text-center py-2 text-slate-600 text-[10px]">예정된 심방 없음</div>
                      ) : (
                        counselingReports.filter(c => c.date === currentSelectedYmd).map(rep => (
                          <div key={rep.id} className="w-full bg-slate-900/60 border border-slate-800 px-2.5 py-1.5 rounded-xl flex justify-between items-center text-[10px]">
                            <button onClick={() => setSelectedCounselingDetail(rep)} className="text-left font-bold text-white flex-1 truncate">{rep.target} 성도 ({rep.counselor})</button>
                            <button onClick={() => setEditingCounseling(rep)} className="text-indigo-400 hover:text-indigo-300 p-1 ml-2"><Edit className="h-3.5 w-3.5" /></button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* THREE DYNAMIC PERCENTAGE PANELS */}
              <div className="grid grid-cols-3 gap-6 bg-slate-800/50 border border-slate-700/60 p-4 rounded-2xl">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-4">
                  <div className="relative h-14 w-14 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-blue-500 transition-all duration-500 animate-pulse" strokeDasharray={`${Math.min(100, performancePercentages.finding)}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{performancePercentages.finding}%</div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1"><Search className="h-3.5 w-3.5 text-blue-400" /> <span>찾기 목표대비 달성비율</span></h4>
                    <span className="text-[10px] text-slate-400 block mt-1">달성: {performancePercentages.findingCount} / 목표: {performancePercentages.findingGoal}건</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-4">
                  <div className="relative h-14 w-14 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-emerald-500 transition-all duration-500 animate-pulse" strokeDasharray={`${Math.min(100, performancePercentages.counseling)}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{performancePercentages.counseling}%</div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-305 uppercase flex items-center gap-1"><FileText className="h-3.5 w-3.5 text-emerald-450" /> <span>심방 계획 달성비율</span></h4>
                    <span className="text-[10px] text-slate-400 block mt-1">완료: {performancePercentages.counselingCount} / 목표: {performancePercentages.counselingGoal}건 ({activeCounselingYm})</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center space-x-4">
                  <div className="relative h-14 w-14 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-indigo-500 transition-all duration-500 animate-pulse" strokeDasharray={`${Math.min(100, performancePercentages.education)}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{performancePercentages.education}%</div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-indigo-400" /> <span>교육 과정 이수비율</span></h4>
                    <span className="text-[10px] text-slate-400 block mt-1">개설 정기 출결 데이터 기반 가중치 환산값</span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED COUNSELING LIST */}
              <div className="bg-slate-800/40 border border-slate-700 p-4 rounded-2xl space-y-3 flex flex-col justify-between shadow-inner">
                <h3 className="text-xs font-bold text-white flex items-center space-x-1.5"><FileText className="text-rose-400 h-4 w-4" /><span>심방 현황 요약 목록 ({activeCounselingYm} 기준 필터링)</span></h3>
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 font-bold sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">날짜</th><th className="py-2.5 px-3">요일</th><th className="py-2.5 px-3 text-slate-300">대상자</th><th className="py-2.5 px-3">심방자</th><th className="py-2.5 px-3">부서</th><th className="py-2.5 px-3">기록 내용 요약</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950/20 font-semibold">
                      {counselingReports.filter(rep => rep.date.startsWith(activeCounselingYm)).length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-6 text-slate-500 font-bold">해당 연월({activeCounselingYm})에 등록된 심방 보고서가 없습니다.</td></tr>
                      ) : (
                        counselingReports.filter(rep => rep.date.startsWith(activeCounselingYm)).map(rep => (
                          <tr key={rep.id} onClick={() => setSelectedCounselingRecord(rep)} className="hover:bg-slate-800/60 cursor-pointer transition-colors">
                            <td className="py-2 px-3 font-semibold text-slate-300">{rep.date}</td><td className="py-2 px-3 text-slate-450">{rep.dayOfWeek}</td><td className="py-2 px-3 font-bold text-white">{rep.target}</td><td className="py-2 px-3 text-slate-200">{rep.counselor}</td><td className="py-2 px-3 text-slate-400">{rep.dept}</td><td className="py-2 px-3 text-slate-400 max-w-sm truncate">{rep.content}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIAL FORCE MANAGEMENT */}
          {activeMenu === 'specialForce' && (
            <div className="p-6 space-y-6">
              <div className="flex justify-center shrink-0">
                <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700 flex space-x-1.5 max-w-md w-full shadow-inner">
                  <button onClick={() => setActiveSfType('front')} className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeSfType === 'front' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
                    <ShieldAlert className="h-4 w-4" /><span>최전방 특전대</span>
                  </button>
                  <button onClick={() => setActiveSfType('rear')} className={`flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeSfType === 'rear' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}>
                    <Users className="h-4 w-4" /><span>후방 특전대</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-700 shadow-md">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" /> <span>관리 대장 기간 선택</span></span>
                  <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    <button onClick={() => handleNavigateSfMonth('prev')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><ChevronLeft className="h-4 w-4" /></button>
                    <span className="text-xs font-bold text-white px-3 font-mono">{activeSfYear}년 {activeSfMonth}월 대장</span>
                    <button onClick={() => handleNavigateSfMonth('next')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                  <button onClick={handleAddSfMonth} className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold py-1.5 px-3 rounded-xl border border-slate-700">+ 년/월 대장 추가</button>
                </div>
                <div className="text-[11px] text-slate-400 font-bold"><span>기준일자:</span> <strong className="text-slate-200 font-mono">2026. 06. 16</strong></div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="bg-slate-900/85 border border-slate-700 rounded-2xl p-4 col-span-4 space-y-3 shadow-lg">
                  <h4 className="text-xs font-bold text-center text-white bg-slate-800 border border-slate-700 py-2 rounded-xl tracking-wide flex items-center justify-center gap-1.5"><ShieldAlert className="h-4 w-4 text-amber-500" /><span>광복부 {activeSfMonth}월 센터 목표 설정</span></h4>
                  <table className="w-full text-center text-[11px] divide-y divide-slate-800">
                    <tbody>
                      {Object.keys(sfCenterGoals).map((key) => (
                        <tr key={key} className="divide-x divide-slate-800">
                          <td className="py-1.5 px-2 text-slate-300 font-bold bg-slate-950/40 capitalize">{key === 'gospel' ? '복음방' : key === 'plucking' ? '따기' : key === 'finding' ? '찾기' : '카드'}</td>
                          <td className="py-1.5 px-2 flex space-x-1.5 justify-center">
                            <input type="text" value={sfCenterGoals[key].text} onChange={(e) => handleUpdateCenterGoal(key, 'text', e.target.value)} className="w-12 bg-slate-950 border border-slate-700 text-center font-bold text-white rounded-lg text-[11px]" />
                            <input type="text" value={sfCenterGoals[key].sub} onChange={(e) => handleUpdateCenterGoal(key, 'sub', e.target.value)} className="w-18 bg-slate-950 border border-slate-700 text-center text-slate-400 rounded-lg text-[9px]" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-900/85 border border-slate-700 rounded-2xl p-4 col-span-8 space-y-3 shadow-lg">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><Flag className="h-4 w-4 text-indigo-400" /> <span>선교 일정 D-day 모니터링 (추가/삭제 가능)</span></h4>
                    <div className="flex items-center space-x-1.5 text-[10px]">
                      <input type="text" placeholder="국가/지역" value={newDdayCountry} onChange={(e) => setNewDdayCountry(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-1 w-20 font-bold focus:outline-none" />
                      <input type="date" value={newDdayDate} onChange={(e) => setNewDdayDate(e.target.value)} className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-1 w-28 font-bold focus:outline-none" />
                      <button onClick={handleAddDday} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-3 py-1 rounded-lg">추가</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {sfDdays.map(d => {
                      const dStatus = calculateDdayStatus(d.date);
                      return (
                        <div key={d.id} className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-center flex flex-col justify-between h-20 relative group hover:border-indigo-500/50 transition-all">
                          <button type="button" onClick={() => handleRemoveDday(d.id)} className="absolute top-1 right-1 text-slate-600 hover:text-rose-400 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-bold">✕</button>
                          <span className="text-[10px] font-bold text-slate-300 truncate block">{d.country}</span>
                          <span className={`text-[10px] py-0.5 px-1.5 bg-slate-900 border border-slate-800 rounded-lg inline-block ${dStatus.style}`}>{dStatus.label} ({d.date.substring(5)})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* TOP RANKINGS PODIUM */}
              <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl space-y-3 relative overflow-hidden">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest text-center flex items-center justify-center gap-1.5"><Crown className="h-4 w-4 text-amber-400" /><span>이번달 특전요원 수확 점수 종합 순위 (TOP 1~3)</span></h4>
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto text-center pt-2">
                  {computedTopRankings[1] && (
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between h-24 transform translate-y-2">
                      <span className="text-[9px] text-slate-400 font-bold">2ND PLACE</span>
                      <strong className="text-slate-300 text-xs block">{computedTopRankings[1].name} 요원</strong>
                      <span className="text-[10px] text-indigo-400 font-mono font-black">{computedTopRankings[1].totalScore} 점</span>
                    </div>
                  )}
                  {computedTopRankings[0] && (
                    <div className="bg-slate-900 border border-indigo-500/60 p-3 rounded-xl flex flex-col justify-between h-28 shadow-xl shadow-indigo-600/10">
                      <span className="text-[9px] text-amber-400 font-bold tracking-widest flex items-center justify-center gap-1">🏆 CHAMPION</span>
                      <strong className="text-white text-sm block font-black">{computedTopRankings[0].name} 요원</strong>
                      <span className="text-xs text-amber-400 font-mono font-black">{computedTopRankings[0].totalScore} 점</span>
                    </div>
                  )}
                  {computedTopRankings[2] && (
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex flex-col justify-between h-24 transform translate-y-4">
                      <span className="text-[9px] text-slate-500 font-bold">3RD PLACE</span>
                      <strong className="text-slate-400 text-xs block">{computedTopRankings[2].name} 요원</strong>
                      <span className="text-[10px] text-rose-400 font-mono font-black">{computedTopRankings[2].totalScore} 점</span>
                    </div>
                  )}
                </div>
              </div>

              {/* MONTHLY SUMMARY ROW */}
              <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl space-y-3 shadow-inner">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-slate-400" /> <span>이번달 누적 성과 종합 집계 (월간 통계)</span></h3>
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-center text-[10.5px] border-collapse bg-slate-950/10">
                    <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 text-left px-3 w-28 text-white font-bold">요원 목록</th>
                        <th className="py-2.5 text-slate-300" colSpan={3}>찾기 (누적)</th>
                        <th className="py-2.5 text-slate-300" colSpan={3}>따기 (누적)</th>
                        <th className="py-2.5 text-slate-300" colSpan={3}>복음방 (누적)</th>
                        <th className="py-2.5 text-indigo-400">배부 카드 수</th>
                      </tr>
                      <tr className="bg-slate-950/50 text-[9px] uppercase tracking-wider">
                        <th></th><th>목표</th><th>달성</th><th>달성율</th><th>목표</th><th>달성</th><th>달성율</th><th>목표</th><th>달성</th><th>달성율</th><th>카드합산</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-semibold text-slate-200">
                      {monthlyAggregatedStats.map(item => {
                        const fRate = item.finding.goal > 0 ? Math.round((item.finding.actual / item.finding.goal) * 100) : 0;
                        const pRate = item.plucking.goal > 0 ? Math.round((item.plucking.actual / item.plucking.goal) * 100) : 0;
                        const gRate = item.gospel.goal > 0 ? Math.round((item.gospel.actual / item.gospel.goal) * 100) : 0;
                        return (
                          <tr key={item.name} className="hover:bg-slate-800/20 divide-x divide-slate-800">
                            <td className="py-2.5 text-left px-3 font-black text-white bg-slate-900/40">{item.name}</td>
                            <td className="py-2.5 text-slate-500 bg-slate-950/20">{item.finding.goal}</td><td className="py-2.5 text-blue-400 font-bold">{item.finding.actual}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(fRate)}>{fRate}%</div></td>
                            <td className="py-2.5 text-slate-500 bg-slate-950/20">{item.plucking.goal}</td><td className="py-2.5 text-amber-400 font-bold">{item.plucking.actual}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(pRate)}>{pRate}%</div></td>
                            <td className="py-2.5 text-slate-500 bg-slate-950/20">{item.gospel.goal}</td><td className="py-2.5 text-emerald-400 font-bold">{item.gospel.actual}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(gRate)}>{gRate}%</div></td>
                            <td className="py-2.5 text-indigo-400 bg-slate-900/30 font-bold">{item.cards} 장</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WEEKLY SPREADSHEETS */}
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-slate-900 p-3.5 rounded-2xl border border-slate-800 shadow-md">
                  <h4 className="text-xs font-bold text-slate-355 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" /> <span>주차별 세부 엑셀 스프레드시트 목록</span></h4>
                  <button onClick={() => { setNewWeekStartInput(`${activeSfYear}-${String(activeSfMonth).padStart(2,'0')}-15`); setIsNewWeekModalOpen(true); }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl">+ 신규 주간 대장 신설</button>
                </div>
                {filteredSheetsForMonth.length === 0 ? (
                  <div className="text-center py-12 bg-slate-900/20 border border-slate-800 rounded-2xl text-slate-500 text-xs">해당 연월에 기록된 주차별 특전대 데이터가 없습니다. 우측의 대장 개설 기능을 이용해 주세요.</div>
                ) : (
                  filteredSheetsForMonth.map(sheet => {
                    let totalGoalFinding = 0, totalActFinding = 0;
                    let totalGoalPlucking = 0, totalActPlucking = 0;
                    let totalGoalGospel = 0, totalActGospel = 0;
                    sheet.members.forEach(m => {
                      totalGoalFinding += (m.goals.finding || 0); totalGoalPlucking += (m.goals.plucking || 0); totalGoalGospel += (m.goals.gospel || 0);
                      ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(day => {
                        totalActFinding += (m.daily[day]?.finding || 0); totalActPlucking += (m.daily[day]?.plucking || 0); totalActGospel += (m.daily[day]?.gospel || 0);
                      });
                    });
                    return (
                      <div key={sheet.id} className="bg-[#1e293b]/70 border border-slate-700 p-4 rounded-2xl space-y-3 shadow-md">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-indigo-400" /><span>{sheet.month}월 {sheet.week}주차 (월요일 시작일: {sheet.startDate})</span></span>
                          <button type="button" onClick={() => { setSfWeeklySheets(prev => { const copy = { ...prev }; const key = Object.keys(copy).find(k => copy[k].id === sheet.id); if (key) delete copy[key]; return copy; }); showToast('🗑️ 지정된 주차 대장이 제거되었습니다.'); }} className="text-slate-550 hover:text-rose-400 text-[10px] font-semibold">기록 삭제</button>
                        </div>
                        <div className="overflow-x-auto border border-slate-800 rounded-xl">
                          <table className="w-full text-center text-[11px] border-collapse min-w-[1200px]">
                            <thead className="bg-slate-900 text-slate-450 border-b border-slate-800">
                              <tr className="divide-x divide-slate-800">
                                <th className="py-2.5 text-left px-4 w-32 bg-slate-950 text-indigo-400 font-bold">요원명 (클릭하여 입력)</th>
                                <th colSpan={3} className="py-1 text-slate-300 font-bold">찾기 성과</th>
                                <th colSpan={3} className="py-1 text-slate-300 font-bold">따기 성과</th>
                                <th colSpan={3} className="py-1 text-slate-300 font-bold">복음방 성과</th>
                              </tr>
                              <tr className="bg-slate-950/80 text-[9.5px] divide-x divide-slate-800 text-slate-400">
                                <th></th><th>목표</th><th>달성</th><th>달성율</th><th>목표</th><th>달성</th><th>달성율</th><th>목표</th><th>달성</th><th>달성율</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 font-semibold text-slate-200">
                              {sheet.members.map(m => {
                                const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
                                const wF = days.reduce((s,d)=>s+(m.daily[d]?.finding||0), 0);
                                const wP = days.reduce((s,d)=>s+(m.daily[d]?.plucking||0), 0);
                                const wG = days.reduce((s,d)=>s+(m.daily[d]?.gospel||0), 0);
                                const fRate = m.goals.finding > 0 ? Math.round((wF / m.goals.finding) * 100) : 0;
                                const pRate = m.goals.plucking > 0 ? Math.round((wP / m.goals.plucking) * 100) : 0;
                                const gRate = m.goals.gospel > 0 ? Math.round((wG / m.goals.gospel) * 100) : 0;
                                return (
                                  <tr key={m.name} className="hover:bg-slate-800/40 divide-x divide-slate-800">
                                    <td className="py-2 px-4 text-left font-black bg-slate-900/50">
                                      <button type="button" onClick={() => handleOpenAgentInput(sheet.id, m.name)} className="text-indigo-400 hover:text-indigo-300 font-bold underline decoration-indigo-500/30 flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> <span>{m.name}</span></button>
                                    </td>
                                    <td className="py-2 bg-slate-950/20 text-slate-400"><input type="number" value={m.goals.finding} onChange={(e) => handleGoalChange(sheet.id, m.name, 'finding', e.target.value)} className="w-12 bg-transparent text-center border-b border-transparent focus:border-slate-700 py-0.5 text-white font-bold" /></td>
                                    <td className="py-2 text-blue-400 font-bold">{wF}</td><td className="py-2 p-0.5"><div className={getRateBadgeStyle(fRate)}>{fRate}%</div></td>
                                    <td className="py-2 bg-slate-950/20 text-slate-400"><input type="number" value={m.goals.plucking} onChange={(e) => handleGoalChange(sheet.id, m.name, 'plucking', e.target.value)} className="w-12 bg-transparent text-center border-b border-transparent focus:border-slate-700 py-0.5 text-white font-bold" /></td>
                                    <td className="py-2 text-amber-400 font-bold">{wP}</td><td className="py-2 p-0.5"><div className={getRateBadgeStyle(pRate)}>{pRate}%</div></td>
                                    <td className="py-2 bg-slate-950/20 text-slate-400"><input type="number" value={m.goals.gospel} onChange={(e) => handleGoalChange(sheet.id, m.name, 'gospel', e.target.value)} className="w-12 bg-transparent text-center border-b border-transparent focus:border-slate-700 py-0.5 text-white font-bold" /></td>
                                    <td className="py-2 text-emerald-400 font-bold">{wG}</td><td className="py-2 p-0.5"><div className={getRateBadgeStyle(gRate)}>{gRate}%</div></td>
                                  </tr>
                                );
                              })}
                              <tr className="bg-slate-950 text-slate-100 font-bold divide-x divide-slate-800 border-t border-slate-700 text-[10px]">
                                <td className="py-2.5 px-4 text-left text-slate-300">합계</td>
                                <td className="py-2.5 text-slate-500">{totalGoalFinding}</td><td className="py-2.5 text-blue-400">{totalActFinding}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(totalGoalFinding > 0 ? Math.round((totalActFinding / totalGoalFinding)*100) : 0)}>{totalGoalFinding > 0 ? Math.round((totalActFinding / totalGoalFinding)*100) : 0}%</div></td>
                                <td className="py-2.5 text-slate-500">{totalGoalPlucking}</td><td className="py-2.5 text-amber-400">{totalActPlucking}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(totalGoalPlucking > 0 ? Math.round((totalActPlucking / totalGoalPlucking)*100) : 0)}>{totalGoalPlucking > 0 ? Math.round((totalActPlucking / totalGoalPlucking)*100) : 0}%</div></td>
                                <td className="py-2.5 text-slate-500">{totalGoalGospel}</td><td className="py-2.5 text-emerald-400">{totalActGospel}</td><td className="py-2.5 p-0.5"><div className={getRateBadgeStyle(totalGoalGospel > 0 ? Math.round((totalActGospel / totalGoalGospel)*100) : 0)}>{totalGoalGospel > 0 ? Math.round((totalActGospel / totalGoalGospel)*100) : 0}%</div></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MONTHLY GOSPEL ROOM VIEW */}
          {activeMenu === 'gospelRoom' && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20"><BookOpen className="h-6 w-6 text-emerald-450" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2"><span>월별 복음방 매니저 테이블</span></h3>
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold">인도 대상자 진행 상태를 모니터링하며, 진행여부는 "진행중/탈락" 2가지만 선택 가능합니다.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <select value={activeGospelMonth} onChange={(e) => { setActiveGospelMonth(e.target.value); setGospelFilters({ leader: '전체', country: '전체', status: '전체', cardSubmitted: '전체' }); }} className="bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs font-bold focus:outline-none">
                    {Object.keys(gospelRooms).map(m => <option key={m} value={m}>{m} 복음방</option>)}
                  </select>
                  <button onClick={() => setIsNewMonthModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center space-x-1.5"><Plus className="h-4 w-4 text-emerald-400" /><span>새해/월 복음방 개설</span></button>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-700 p-4 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input type="text" placeholder="인도자 및 섭외자 검색..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-8 pr-3 text-xs text-white focus:outline-none" />
                  </div>
                  <div>
                    <select value={gospelFilters.leader} onChange={(e) => setGospelFilters(prev => ({ ...prev, leader: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-slate-300 focus:outline-none">
                      <option value="전체">전체 인도자</option>
                      {uniqueGospelLeaders.filter(l => l !== '전체').map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <select value={gospelFilters.country} onChange={(e) => setGospelFilters(prev => ({ ...prev, country: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-slate-300 focus:outline-none">
                      <option value="전체">전체 국가</option>
                      {uniqueGospelCountries.filter(c => c !== '전체').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <select value={gospelFilters.status} onChange={(e) => setGospelFilters(prev => ({ ...prev, status: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-slate-300 focus:outline-none">
                      <option value="전체">전체 진행상황</option><option value="진행중">진행중</option><option value="탈락">탈락</option>
                    </select>
                  </div>
                  <div>
                    <select value={gospelFilters.cardSubmitted} onChange={(e) => setGospelFilters(prev => ({ ...prev, cardSubmitted: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-2.5 text-xs text-slate-300 focus:outline-none">
                      <option value="전체">전체 카드제출</option><option value="O">제출완료 (O)</option><option value="X">미제출 (X)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/20 border border-slate-700 rounded-2xl overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1400px]">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 text-[11px] font-bold border-b border-slate-700">
                      <th className="py-4 px-4 w-40">인도자 이름</th><th className="py-4 px-4 w-40">섭외자 이름</th><th className="py-4 px-4 w-28">국가</th><th className="py-4 px-4 w-36">섭외 날짜</th><th className="py-4 px-4 w-40">핸드폰 번호</th><th className="py-4 px-4 text-center w-24">복음방 횟수</th><th className="py-4 px-4 text-center w-24">세미나 횟수</th><th className="py-4 px-4 w-32">복음방 진행여부</th><th className="py-4 px-4 w-36">탈락사유</th><th className="py-4 px-4 text-center w-24">카드제출 여부</th><th className="py-4 px-4 min-w-[340px]">메모</th><th className="py-4 px-4 text-center w-16">제거</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-xs bg-slate-950/10">
                    {filteredGospelList.length === 0 ? (
                      <tr><td colSpan={12} className="text-center py-12 text-slate-500 font-bold">개설되었거나 필터링된 기록이 존재하지 않습니다.</td></tr>
                    ) : (
                      filteredGospelList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2 px-2"><input type="text" value={item.leader} onChange={(e) => handleUpdateGospelRow(item.id, 'leader', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 w-full text-white font-bold" /></td>
                          <td className="py-2 px-2"><input type="text" value={item.scout} onChange={(e) => handleUpdateGospelRow(item.id, 'scout', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 w-full text-slate-200" /></td>
                          <td className="py-2 px-2"><input type="text" value={item.country} onChange={(e) => handleUpdateGospelRow(item.id, 'country', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 w-full text-slate-300 font-bold" /></td>
                          <td className="py-2 px-2"><input type="date" value={item.date} onChange={(e) => handleUpdateGospelRow(item.id, 'date', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-300 font-semibold" /></td>
                          <td className="py-2 px-2"><input type="text" value={item.phone} onChange={(e) => handleUpdateGospelRow(item.id, 'phone', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 w-full text-slate-400 font-mono" /></td>
                          <td className="py-2 px-2 text-center"><input type="number" value={item.countBB ?? 0} onChange={(e) => handleUpdateGospelRow(item.id, 'countBB', parseInt(e.target.value) || 0)} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 w-14 text-center text-white font-bold" /></td>
                          <td className="py-2 px-2 text-center"><input type="number" value={item.countSeminar ?? 0} onChange={(e) => handleUpdateGospelRow(item.id, 'countSeminar', parseInt(e.target.value) || 0)} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 w-14 text-center text-white font-bold" /></td>
                          <td className="py-2 px-2">
                            <select value={item.status} onChange={(e) => handleUpdateGospelRow(item.id, 'status', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 w-full font-bold focus:outline-none">
                              <option value="진행중">진행중</option><option value="탈락">탈락</option>
                            </select>
                          </td>
                          <td className="py-2 px-2">
                            <select value={item.failReason || ''} disabled={item.status !== '탈락'} onChange={(e) => handleUpdateGospelRow(item.id, 'failReason', e.target.value)} className={`bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 w-full font-bold focus:outline-none ${item.status !== '탈락' ? 'opacity-30' : ''}`}>
                              <option value="">-- 사유 선택 --</option><option value="마음부족">마음부족</option><option value="연락두절">연락두절</option><option value="기준X">기준X</option><option value="단시비">단시비</option><option value="기타">기타</option>
                            </select>
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button type="button" onClick={() => handleUpdateGospelRow(item.id, 'cardSubmitted', !item.cardSubmitted)} className={`px-3 py-1.5 rounded-full text-[10px] font-black ${item.cardSubmitted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>{item.cardSubmitted ? 'O' : 'X'}</button>
                          </td>
                          <td className="py-2 px-2"><textarea rows="2" value={item.memo || ''} onChange={(e) => handleUpdateGospelRow(item.id, 'memo', e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 w-full text-slate-300 text-xs min-h-[45px] resize-y" placeholder="기록 사항 메모..." /></td>
                          <td className="py-2 px-2 text-center">
                            <button onClick={() => { setGospelRooms(prev => ({ ...prev, [activeGospelMonth]: prev[activeGospelMonth].filter(row => row.id !== item.id) })); showToast('🗑/ 복음방 성도가 제거되었습니다.'); }} className="text-slate-600 hover:text-rose-400 p-1.5"><Trash2 className="h-4 w-4" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-slate-900/95 font-bold border-t border-slate-700 text-xs">
                    <tr>
                      <td className="py-4 px-4 text-white">합계 (필터 반영)</td><td className="py-4 px-4 text-slate-400">총 {gospelAggregates.total}건</td><td className="py-4 px-4"></td><td className="py-4 px-4"></td><td className="py-4 px-4"></td><td className="py-4 px-4 text-center text-white text-sm font-bold">{gospelAggregates.totalBB} 회</td><td className="py-4 px-4 text-center text-white text-sm font-bold">{gospelAggregates.totalSeminar} 회</td><td className="py-4 px-4 text-slate-300">진행중: {gospelAggregates.inProgress}건</td><td className="py-4 px-4 text-rose-400">탈락: {gospelAggregates.failed}건</td><td className="py-4 px-4 text-center"><span className="text-emerald-400 block font-bold">{gospelAggregates.cards}건 완료</span><span className="text-[9px] text-slate-500">제출률: {gospelAggregates.cardRate}%</span></td><td className="py-4 px-4"></td>
                      <td className="py-4 px-4 text-center">
                        <button onClick={() => {
                          const newRow = { id: 'g_' + Date.now(), leader: '신규 인도자', scout: '신규 섭외자', country: '대한민국', date: currentSelectedYmd, phone: '010-0000-0000', countBB: 0, countSeminar: 0, status: '진행중', failReason: '', cardSubmitted: false, memo: '' };
                          setGospelRooms(prev => ({ ...prev, [activeGospelMonth]: [...(prev[activeGospelMonth] || []), newRow] }));
                          showToast('➕ 복음방 입력 행이 추가되었습니다.');
                        }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-[10px] py-2 px-3 rounded-xl">+ 행 추가</button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: EDUCATION TABS */}
          {activeMenu === 'education' && (
            <div className="p-6 space-y-6">
              <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700 flex items-center gap-3">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl"><TrendingUp className="h-6 w-6 text-indigo-400" /></div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2"><span>교육 출석부 시스템</span></h3>
                  <p className="text-[11px] text-slate-400 mt-1">요일 기준 고정 프로그램(월요일 사명자 모임 디폴트 탑재)을 개설하고 수강 명단 별 출결 데이터를 회차별로 안전하게 기록합니다.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="bg-slate-800/30 border border-slate-700 p-5 rounded-2xl col-span-5 space-y-5">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-1.5"><Plus className="h-4 w-4 text-indigo-400" /> <span>정기 교육 과정 신규 개설</span></h4>
                    <form onSubmit={(e) => {
                      e.preventDefault(); const name = e.target.eduName.value; const weekday = e.target.eduWeekday.value; if (!name) return;
                      const newEp = { id: 'ep_' + Date.now(), name, weekday, participants: [], dates: [] };
                      setEducationPrograms(prev => [...prev, newEp]); e.target.reset(); showToast(`🎓 [${name}] 과정이 신규 등록되었습니다.`);
                    }} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">교육 과정 명칭</label>
                        <input name="eduName" type="text" placeholder="사명자 모임, 신자 교육 등" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">고정 진행 요일 선택</label>
                        <select name="eduWeekday" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-slate-200 font-bold focus:outline-none">
                          {weekdays.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-2.5 rounded-xl">교육 과정 개설 완료</button>
                    </form>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1"><BookOpen className="h-4 w-4 text-slate-500" /> <span>현재 활성화된 정기 과정 ({educationPrograms.length}개)</span></h4>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                      {educationPrograms.map(ep => (
                        <div key={ep.id} onClick={() => setActiveEduProgramModal(ep)} className="p-3.5 rounded-2xl border border-slate-800 bg-slate-900 hover:border-slate-700 transition-all cursor-pointer flex justify-between items-center group shadow-md">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-slate-500 group-hover:text-indigo-400" />
                            <div>
                              <span className="text-xs font-bold text-white block group-hover:text-slate-200">{ep.name}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5">매주 {ep.weekday} 진행 · 수강 성도 {ep.participants.length}명</span>
                            </div>
                          </div>
                          {ep.id !== 'ep1' && (
                            <button onClick={(e) => { e.stopPropagation(); setEducationPrograms(prev => prev.filter(p => p.id !== ep.id)); showToast('🗑️ 교육 과정이 목록에서 제거되었습니다.'); }} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 className="h-4 w-4" /></button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 border border-slate-700 p-5 rounded-2xl col-span-7 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1.5"><Info className="h-4 w-4 text-indigo-400" /> <span>출석 체크 매뉴얼</span></h4>
                    <p className="text-xs text-slate-400 leading-relaxed">좌측의 개설 프로그램 목록에서 과정명을 터치하시면 **수강 인원 추가와 날짜별 출결 보드**가 팝업 형태로 개설됩니다. 결석 성도의 경우 사후 사유 처리가 가능합니다.</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl text-[10px] text-slate-500 font-bold border border-slate-900 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /><span>* 월요일 사명자 모임은 정교사 및 보조 전도가 고정으로 배정된 세션입니다.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COUNSELING MANAGEMENT VIEW */}
          {activeMenu === 'counseling' && (
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-700 shadow-md">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" /> <span>심방 보고서 조회 달 선택</span></span>
                  <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                    <button onClick={() => handleNavigateCounselingMonth('prev')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><ChevronLeft className="h-4 w-4" /></button>
                    <span className="text-xs font-bold text-white px-3 font-mono">{activeCounselingYm.split('-')[0]}년 {activeCounselingYm.split('-')[1]}월 심방</span>
                    <button onClick={() => handleNavigateCounselingMonth('next')} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"><ChevronRight className="h-4 w-4" /></button>
                  </div>

                  
                  <button onClick={() => {
  const d = new Date(); d.setMonth(d.getMonth() + 1);
  const ymInput = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  setActiveCounselingYm(ymInput); showToast(`📅 [${ymInput}] 심방 세션 목록이 생성되었습니다.`);
}} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg">+ 새 달 개설</button>
                </div>
                <div className="text-[11px] text-slate-400 font-bold"><span>지정 연월 심방 목표량:</span> <strong className="text-white font-mono">{currentMonthCounselingGoal}건</strong></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FileText className="h-4 w-4 text-rose-400" /><span>당월 심방 수행율 ({activeCounselingYm})</span></h4>
                    <div className="flex items-baseline space-x-2 mt-3">
                      <span className="text-3xl font-black text-rose-400">{performancePercentages.counseling}%</span>
                      <span className="text-xs text-slate-400 font-semibold">(완료 {performancePercentages.counselingCount}건 / 목표 {currentMonthCounselingGoal}건)</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-855 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Settings className="h-4 w-4 text-indigo-400" /><span>당월 심방 목표 개수 동적 수정</span></h4>
                    <div className="flex items-center space-x-3 mt-3">
                      <input type="number" value={currentMonthCounselingGoal} onChange={(e) => { const val = Math.max(1, parseInt(e.target.value) || 1); setCounselingGoals(prev => ({ ...prev, [activeCounselingYm]: val })); }} className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-center font-black text-white w-24 text-sm focus:outline-none" />
                      <span className="text-xs text-slate-400 font-bold">건으로 심방 목표 설정</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-black tracking-widest block uppercase">QUICK LAUNCH</span>
                    <h4 className="text-xs font-bold text-white">현 시간 기준 즉시 심방 작성</h4>
                  </div>
                  <button onClick={() => setIsCounselingModalOpen(true)} className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl">+. 신규 심방 작성</button>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-700 p-4 rounded-2xl space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5"><FileText className="h-4 w-4 text-indigo-400" /> <span>등록 완료된 심방보고 이력 전체보기</span></h4>
                  <div className="relative w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input type="text" placeholder="성도명, 심방자, 내용 검색..." value={counselingSearchText} onChange={(e) => setCounselingSearchText(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 w-full text-xs text-white focus:outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">일자 및 요일</th><th className="py-3 px-4">부서</th><th className="py-3 px-4 text-white font-bold">대상 성도명</th><th className="py-3 px-4">실제 심방자</th><th className="py-3 px-4">심방 내용 및 상세 피드백</th><th className="py-3 px-4 text-center">동작</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950/10 font-medium">
                      {filteredCounselingReports.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-10 text-slate-500 font-bold">지정 연월({activeCounselingYm}) 조건에 맞는 심방 보고서가 존재하지 않습니다.</td></tr>
                      ) : (
                        filteredCounselingReports.map(rep => (
                          <tr key={rep.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4 text-slate-300 font-semibold">{rep.date} ({rep.dayOfWeek})</td><td className="py-3 px-4 text-slate-450">{rep.dept}</td><td className="py-3 px-4 text-white font-black">{rep.target}</td><td className="py-3 px-4 text-indigo-350 font-bold">{rep.counselor}</td><td className="py-3 px-4 text-slate-300 max-w-sm truncate" title={rep.content}>{rep.content}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <button onClick={() => setEditingCounseling(rep)} className="text-indigo-400 hover:text-indigo-300 font-bold">수정</button>
                                <span className="text-slate-800">|</span>
                                <button onClick={() => { setCounselingReports(prev => prev.filter(c => c.id !== rep.id)); showToast('🗑️ 심방 보고서가 삭제되었습니다.'); }} className="text-rose-400 hover:text-rose-405">삭제</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TEACHERS ATTENDANCE TAB */}
          {activeMenu === 'attendance' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl lg:col-span-8 space-y-5 shadow-lg">
                  <div className="pb-3 border-b border-slate-700 flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl"><Users className="h-5 w-5 text-indigo-400" /></div>
                      <div>
                        <h3 className="text-sm font-bold text-white">교사 회의 모임 출석 대장</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">사유가 보존되는 동적 회의 일정을 조율할 수 있습니다.</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
                      <input type="date" defaultValue="2026-06-25" id="new_meeting_ymd" className="bg-slate-950 border border-slate-700 text-white rounded-lg p-1 text-xs font-bold focus:outline-none" />
                      <button onClick={() => {
                        const val = document.getElementById('new_meeting_ymd').value; if (!val) return;
                        if (teacherMeetings.includes(val)) { showToast('⚠️ 이미 생성된 회차 날짜입니다.'); return; }
                        setTeacherMeetings(prev => [val, ...prev]); showToast(`📅 ${val} 교사 모임 출석부가 추가되었습니다.`);
                      }} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold py-1 px-3 rounded-lg text-xs">모임 추가</button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {teacherMeetings.map(ymd => (
                      <div key={ymd} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" /> <span>{ymd} 교사 정기 세션</span></h4>
                          <button onClick={() => { setTeacherMeetings(prev => prev.filter(m => m !== ymd)); showToast('🗑️ 교사 정기 모임 출석 대장이 소거되었습니다.'); }} className="text-slate-500 hover:text-rose-400 text-xs font-bold">지우기</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          {teachers.map(t => {
                            const attState = teachersAttendance[ymd]?.[t.id] || { attended: false, reason: '' };
                            return (
                              <div key={t.id} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between space-x-3 shadow-md">
                                <div className="flex-1 min-w-0 font-bold">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="font-bold text-white truncate block">{t.name}</span>
                                    <span className="text-[9px] bg-slate-800 text-orange-400 px-1.5 py-0.5 rounded-lg border border-orange-500/10">{t.role}</span>
                                  </div>
                                  {!attState.attended && (
                                    <input type="text" placeholder="결석/불참 사유 입력" value={attState.reason} onChange={(e) => {
                                      const r = e.target.value;
                                      setTeachersAttendance(prev => {
                                        const day = prev[ymd] || {}; const tD = day[t.id] || { attended: false, reason: '' };
                                        return { ...prev, [ymd]: { ...day, [t.id]: { ...tD, reason: r } } };
                                      });
                                    }} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 mt-1 text-[10px] text-slate-300 focus:outline-none" />
                                  )}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                  <button type="button" onClick={() => {
                                    setTeachersAttendance(prev => {
                                      const day = prev[ymd] || {}; const tD = day[t.id] || { attended: false, reason: '' };
                                      return { ...prev, [ymd]: { ...day, [t.id]: { ...tD, attended: !tD.attended } } };
                                    });
                                  }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${attState.attended ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'}`}>{attState.attended ? '출석' : '결석'}</button>
                                  {!attState.attended && (
                                    <button type="button" onClick={() => {
                                      setTeachersAttendance(prev => {
                                        const day = prev[ymd] || {}; const tD = day[t.id] || { attended: false, reason: '' };
                                        return { ...prev, [ymd]: { ...day, [t.id]: { ...tD, homework: !tD.homework } } };
                                      });
                                    }} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${attState.homework ? 'bg-blue-600/20 text-blue-300 border border-blue-500/20' : 'bg-slate-700/50 text-slate-500 border border-slate-700'}`}>
                                      {attState.homework ? '과제✓' : '과제?'}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl lg:col-span-4 space-y-5 shadow-lg">
                  <div>
                    <h4 className="text-xs font-bold text-white mb-3 flex items-center space-x-2 pb-1.5 border-b border-slate-700"><User className="text-slate-450 h-4 w-4" /><span>교사 인명 대장</span></h4>
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-2">
                      {teachers.map(t => (
                        <button key={t.id} onClick={() => {
                          const total = teacherMeetings.length; let attend = 0;
                          teacherMeetings.forEach(ymd => { const att = teachersAttendance[ymd]?.[t.id]; if (att?.attended || att?.homework) attend++; });
                          const rate = total > 0 ? Math.round((attend / total) * 100) : 0;
                          t.computedStats = { total, attend, rate };
                          setTeachers(prev => prev.map(item => item.id === t.id ? { ...item, computedStats: t.computedStats, focusActive: true } : { ...item, focusActive: false }));
                        }} className={`p-2.5 rounded-xl border w-full text-left transition-all flex justify-between items-center ${t.focusActive ? 'bg-slate-800 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}>
                          <div className="flex items-center gap-1.5 font-bold">
                            <User className="h-3.5 w-3.5 text-slate-500" />
                            <div><span className="text-xs font-black text-white">{t.name}</span><span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-lg ml-2 border border-slate-800">{t.role}</span></div>
                          </div>
                          <Clock className="h-3.5 w-3.5 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div id="teacher_focus_card">
                    {(() => {
                      const selected = teachers.find(t => t.focusActive === true);
                      if (!selected) return <div className="bg-slate-900/40 py-6 text-center text-slate-600 text-[11px] rounded-xl border border-slate-800 font-bold">명단의 교사 성명을 선택하시면 누적 출근 리포트가 도식화됩니다.</div>;
                      return (
                        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
                          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
                            <div className="bg-slate-800 border border-slate-700 p-2 rounded-xl text-white font-bold">{selected.name[0]}</div>
                            <div><h5 className="font-bold text-white">{selected.name} 교사</h5><span className="text-[10px] text-slate-400">직책: <strong className="text-indigo-400">{selected.role}</strong></span></div>
                          </div>
                          <div className="space-y-1.5 text-slate-400 font-bold">
                            <div className="flex justify-between"><span>연락망</span><span className="text-slate-200">{selected.phone}</span></div>
                            <div className="flex justify-between"><span>회의 참여율</span><span className="text-indigo-400 font-black text-sm">{selected.computedStats?.rate}%</span></div>
                          </div>
                          <div className="space-y-1 pt-1 border-t border-slate-900">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">결석 사유 내역</span>
                            {teacherMeetings.map(ymd => {
                              const att = teachersAttendance[ymd]?.[selected.id];
                              if (!att || att.attended) return null;
                              return (
                                <div key={ymd} className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
                                  <span className="text-slate-400 text-[10px]">{ymd}</span>
                                  <span className="text-rose-400 text-[10px] font-bold">{att.reason || '사유 없음'}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-slate-950/40 p-3 rounded-2xl border border-slate-800 space-y-2">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1"><Plus className="h-3.5 w-3.5 text-indigo-400" /> <span>신임 교사 등록</span></h5>
                    <div className="space-y-2 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="성명" id="add_t_name" className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-bold focus:outline-none" />
                        <select id="add_t_role" className="bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-slate-305 font-bold focus:outline-none">
                          <option value="부장">부장</option><option value="교관">교관</option><option value="정교사2">정교사2</option><option value="정교사1">정교사1</option><option value="예비교사">예비교사</option>
                        </select>
                      </div>
                      <input type="text" placeholder="전화번호" id="add_t_phone" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-bold focus:outline-none" />
                      <button onClick={() => {
                        const name = document.getElementById('add_t_name').value; const role = document.getElementById('add_t_role').value; const phone = document.getElementById('add_t_phone').value || '010-0000-0000';
                        if (!name) { showToast('⚠️ 성명을 작성해 주세요.'); return; }
                        setTeachers(prev => [...prev, { id: 't_' + Date.now(), name, phone, role, status: '활동중' }]);
                        document.getElementById('add_t_name').value = ''; document.getElementById('add_t_phone').value = ''; showToast(`👤 [${name}] 교사가 명단에 편입되었습니다.`);
                      }} className="w-full bg-slate-800 hover:bg-slate-855 text-slate-200 border border-slate-750 font-bold py-1.5 rounded-lg">신임 임명 완료</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODALS */}
      {isNewMonthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Plus className="h-4 w-4 text-indigo-400" /> <span>신규 월별 복음방 개설</span></h3>
              <button onClick={() => setIsNewMonthModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">생성 연월 (YYYY-MM)</label>
                <input type="month" id="gospel_new_month_input" defaultValue="2026-07" className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-center focus:outline-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-700">
                <button onClick={() => setIsNewMonthModalOpen(false)} className="bg-slate-700 text-slate-300 px-4 py-2 rounded-xl font-bold">취소</button>
                <button onClick={() => {
                  const val = document.getElementById('gospel_new_month_input').value; if (!val) return;
                  if (gospelRooms[val]) { showToast('⚠️ 이미 존재하는 세션 연월입니다.'); return; }
                  setGospelRooms(prev => ({ ...prev, [val]: [] })); setActiveGospelMonth(val); setIsNewMonthModalOpen(false); showToast(`📂 [${val}] 신규 복음방 전용 시트가 개설되었습니다.`);
                }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold">생성</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeEduProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col justify-between shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700 shrink-0">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 tracking-wider">EDUCATION SPREADSHEET</span>
                <h3 className="text-base font-bold text-white mt-1 flex items-center gap-1.5"><TrendingUp className="h-5 w-5 text-indigo-400" /><span>[{activeEduProgramModal.name}] 과정 출결 종합 매트릭스</span></h3>
              </div>
              <button onClick={() => setActiveEduProgramModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-300">👥 교육 대상자 수강생 명단 관리</h4>
                <form onSubmit={(e) => {
                  e.preventDefault(); const pName = e.target.newParticipantName.value.trim(); if (!pName) return;
                  if (activeEduProgramModal.participants.includes(pName)) { showToast('⚠️ 이미 명단에 존재하는 이름입니다.'); return; }
                  setEducationPrograms(prev => prev.map(p => {
                    if (p.id === activeEduProgramModal.id) {
                      const updated = { ...p, participants: [...p.participants, pName] }; setActiveEduProgramModal(updated); return updated;
                    }
                    return p;
                  })); e.target.reset(); showToast(`👤 [${pName}] 성도가 과정 배정 명단에 추가되었습니다.`);
                }} className="flex space-x-2 text-xs">
                  <input name="newParticipantName" type="text" placeholder="성도 이름 입력..." className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-bold focus:outline-none" />
                  <button type="submit" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-5 py-2 rounded-xl">배정 추가</button>
                </form>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeEduProgramModal.participants.map(name => (
                    <span key={name} className="bg-slate-950 text-slate-300 border border-slate-800 rounded-xl px-3 py-1.5 text-[10px] font-bold flex items-center space-x-2">
                      <button type="button" onClick={() => {
                        const history = []; let total = activeEduProgramModal.dates.length; let att = 0;
                        activeEduProgramModal.dates.forEach(d => {
                          const r = educationAttendance[activeEduProgramModal.id]?.[d]?.[name]; const isAtt = typeof r === 'boolean' ? r : r?.attended === true;
                          if (isAtt) att++; history.push({ date: d, attended: isAtt, reason: r?.reason || '' });
                        });
                        setSelectedEduStudent({ name, programName: activeEduProgramModal.name, rate: total > 0 ? Math.round((att/total)*100) : 0, history });
                      }} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold underline"><User className="h-3 w-3" /><span>{name}</span></button>
                      <button onClick={() => {
                        setEducationPrograms(prev => prev.map(p => {
                          if (p.id === activeEduProgramModal.id) {
                            const updated = { ...p, participants: p.participants.filter(item => item !== name) }; setActiveEduProgramModal(updated); return updated;
                          }
                          return p;
                        })); showToast('🗑️ 명단 제외 완료.');
                      }} className="text-slate-500 hover:text-rose-400">✕</button>
                    </span>
                  ))}
                </div>
              </div>

      
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-300">📅 교육 회차 날짜 생성 및 추가</h4>
                  <button onClick={() => handleAddEduDateAutomated(activeEduProgramModal.id)} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl">+ 다음 주 {activeEduProgramModal.weekday} 회차 자동 예약</button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeEduProgramModal.dates.map(d => (
                    <span key={d} className="bg-slate-950 text-indigo-400 border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] font-bold flex items-center space-x-1.5">
                      <span>{d}</span>
                      <button onClick={() => { handleRemoveEduDate(activeEduProgramModal.id, d); setActiveEduProgramModal(prev => ({ ...prev, dates: prev.dates.filter(x => x !== d) })); }} className="text-slate-500 hover:text-rose-400">✕</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-300">📊 실시간 출결 체크 현황 테이블</h4>
                {activeEduProgramModal.participants.length === 0 || activeEduProgramModal.dates.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-bold">교육 대상 성도와 교육 회차 날짜 정보를 입력하시면 보드가 활성화됩니다.</div>
                ) : (
                  <div className="overflow-x-auto border border-slate-800 rounded-xl">
                    <table className="w-full text-center text-xs min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                          <th className="py-3 px-4 text-left w-36 bg-slate-950">성도 이름</th>
                          {activeEduProgramModal.dates.map(date => <th key={date} className="py-3 px-2 min-w-[120px]">{date}</th>)}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950/20 font-bold">
                        {activeEduProgramModal.participants.map(name => (
                          <tr key={name} className="hover:bg-slate-900/40">
                            <td className="py-4 px-4 text-left text-white bg-slate-900/20 font-black">
                              <button type="button" onClick={() => {
                                const history = []; let total = activeEduProgramModal.dates.length; let att = 0;
                                activeEduProgramModal.dates.forEach(d => {
                                  const r = educationAttendance[activeEduProgramModal.id]?.[d]?.[name]; const isAtt = typeof r === 'boolean' ? r : r?.attended === true;
                                  if (isAtt) att++; history.push({ date: d, attended: isAtt, reason: r?.reason || '' });
                                });
                                setSelectedEduStudent({ name, programName: activeEduProgramModal.name, rate: total > 0 ? Math.round((att/total)*100) : 0, history });
                              }} className="text-indigo-400 hover:text-indigo-300 hover:underline text-xs font-bold flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> <span>{name}</span></button>
                            </td>
                            {activeEduProgramModal.dates.map(date => {
                              const r = educationAttendance[activeEduProgramModal.id]?.[date]?.[name];
                              const isAttended = typeof r === 'boolean' ? r : r?.attended === true;
                              return (
                                <td key={date} className="py-3 px-2 border-r border-slate-800">
                                  <div className="flex flex-col items-center space-y-1.5">
                                    <button type="button" onClick={() => handleToggleEduAttendanceDirect(activeEduProgramModal.id, date, name, isAttended)} className={`w-10 h-10 rounded-xl border text-xs font-bold flex items-center justify-center ${isAttended ? 'bg-emerald-600 text-white border-emerald-500/30' : 'bg-rose-600 text-white border-rose-500/30'}`}>{isAttended ? '출석' : '결석'}</button>
                                    {!isAttended && <input type="text" placeholder="결석 사유 입력" value={r?.reason || ''} onChange={(e) => handleUpdateEduReason(activeEduProgramModal.id, date, name, e.target.value)} className="w-24 bg-slate-950 border border-slate-700 text-[10px] text-slate-300 text-center rounded-lg py-0.5" />}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-3 border-t border-slate-700 shrink-0"><button onClick={() => setActiveEduProgramModal(null)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs">확인 및 닫기</button></div>
          </div>
        </div>
      )}

      {selectedEduStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2"><User className="text-indigo-400 h-4 w-4" /><span>[{selectedEduStudent.name}] 성도 수강생 출결 상태 리포트</span></h4>
              <button onClick={() => setSelectedEduStudent(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="bg-slate-900 p-3 rounded-xl flex justify-between items-center border border-slate-800">
                <div><span className="text-slate-400 text-[10px] block font-bold">진행 교육 명칭</span><strong className="text-white text-sm">{selectedEduStudent.programName}</strong></div>
                <div className="text-right"><span className="text-slate-400 text-[10px] block font-bold">과정 이수율</span><strong className="text-indigo-400 text-lg font-black">{selectedEduStudent.rate}%</strong></div>
              </div>
              <h5 className="font-bold text-slate-300">📅 세션별 참여 및 결석 사유 내역</h5>
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-2">
                {selectedEduStudent.history.map(item => (
                  <div key={item.date} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center font-bold">
                    <span className="text-slate-300">{item.date}</span>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.attended ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-405'}`}>{item.attended ? '출석' : '결석'}</span>
                      {!item.attended && item.reason && <span className="text-slate-400 italic text-[10px] max-w-[150px] truncate">사유: {item.reason}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-3 border-t border-slate-750"><button onClick={() => setSelectedEduStudent(null)} className="bg-slate-750 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-xl text-xs">닫기</button></div>
          </div>
        </div>
      )}

      {selectedCounselingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <h3 className="text-xs font-bold text-white flex items-center space-x-1.5"><FileText className="h-4 w-4 text-slate-400" /><span>심방 기록 세부 정보</span></h3>
              <button onClick={() => setSelectedCounselingDetail(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>
            <div className="space-y-3 text-[11px]">
              <div className="grid grid-cols-2 gap-2 bg-slate-900 p-2 rounded-lg">
                <div><span className="text-slate-400 block text-[9px]">대상 성도</span><strong className="text-white">{selectedCounselingDetail.target}</strong></div>
                <div><span className="text-slate-400 block text-[9px]">심방 교사</span><strong className="text-slate-300">{selectedCounselingDetail.counselor}</strong></div>
              </div>
              <p className="bg-slate-950 p-3 rounded-lg text-slate-200 leading-relaxed font-medium whitespace-pre-wrap">{selectedCounselingDetail.content}</p>
            </div>
            <div className="flex justify-end pt-2 border-t border-slate-700"><button onClick={() => setSelectedCounselingDetail(null)} className="bg-slate-700 hover:bg-slate-655 text-white font-bold px-3 py-1.5 rounded-lg text-xs">닫기</button></div>
          </div>
        </div>
      )}

      {editingCounseling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Edit className="h-4 w-4 text-indigo-400" /><span>[{editingCounseling.target}] 성도 심방 보고 수정</span></h3>
              <button onClick={() => setEditingCounseling(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">심방 일자</label>
                  <input type="date" value={editingCounseling.date} onChange={(e) => { const calculated = getWeekdayName(new Date(e.target.value)); setEditingCounseling(prev => ({ ...prev, date: e.target.value, dayOfWeek: calculated })); }} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2 font-bold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">대상 성도명</label>
                  <input type="text" value={editingCounseling.target} onChange={(e) => setEditingCounseling(prev => ({ ...prev, target: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2 font-bold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">심방자 입력 (교사 빠른 선택 가능)</label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input type="text" placeholder="심방자 이름 직접 기입..." value={editingCounseling.counselor} onChange={(e) => setEditingCounseling(prev => ({ ...prev, counselor: e.target.value }))} className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-xl p-2 font-bold focus:outline-none" />
                    <select onChange={(e) => { if (e.target.value) setEditingCounseling(prev => ({ ...prev, counselor: e.target.value })); }} className="bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-2.5 text-xs font-bold focus:outline-none">
                      <option value="">-- 교사 선택 --</option>
                      {teachers.map(t => <option key={t.id} value={t.name}>{t.name} ({t.role})</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">심방 내용 및 후속 대책</label>
                <textarea rows="4" value={editingCounseling.content} onChange={(e) => setEditingCounseling(prev => ({ ...prev, content: e.target.value }))} className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-750">
              <button onClick={() => setEditingCounseling(null)} className="bg-slate-700 text-slate-300 px-5 py-2 rounded-xl font-bold text-xs">취소</button>
              <button onClick={() => {
                if (!editingCounseling.counselor || !editingCounseling.target || !editingCounseling.content) { showToast('⚠️ 모든 필수 항목을 입력해주세요.'); return; }
                setCounselingReports(prev => prev.map(c => c.id === editingCounseling.id ? editingCounseling : c)); setEditingCounseling(null); showToast('💾 심방 보고서가 수정되었습니다.');
              }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-bold text-xs">변경내용 저장</button>
            </div>
          </div>
        </div>
      )}

      {selectedCounselingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">COUNSELING DETAIL</span>
              <button onClick={() => setSelectedCounselingRecord(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-slate-500 text-[9px] block font-bold">부서</span><strong className="text-slate-200 text-xs">{selectedCounselingRecord.dept}</strong></div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-slate-500 text-[9px] block font-bold">심방 일자</span><strong className="text-slate-200 text-xs">{selectedCounselingRecord.date} ({selectedCounselingRecord.dayOfWeek})</strong></div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-slate-500 text-[9px] block font-bold">심방자</span><strong className="text-slate-200 text-xs">{selectedCounselingRecord.counselor}</strong></div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800"><span className="text-slate-500 text-[9px] block font-bold">대상 성도명</span><strong className="text-white text-xs">{selectedCounselingRecord.target}</strong></div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800"><span className="text-slate-500 text-[9px] block mb-1.5 font-bold">심방 내용 (방법)</span><p className="text-slate-200 leading-relaxed text-xs font-medium whitespace-pre-wrap">{selectedCounselingRecord.content}</p></div>
            </div>
            <div className="flex justify-end pt-2"><button onClick={() => setSelectedCounselingRecord(null)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">확인 완료</button></div>
          </div>
        </div>
      )}

      {isCounselingModalOpen && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><FileText className="h-4 w-4 text-slate-400" /> <span>광복부 심방보고 등록</span></h3>
              <button onClick={() => setIsCounselingModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault(); const dateVal = e.target.counselingDate.value || currentSelectedYmd; const calculated = getWeekdayName(new Date(dateVal));
              const counselor = e.target.counselorName.value; const target = e.target.target.value; const content = e.target.content.value;
              if (!counselor || !target || !content) { showToast('⚠️ 모든 항목을 작성해주세요.'); return; }
              setCounselingReports(prev => [{ id: 'c_' + Date.now(), dept: '광복부', date: dateVal, dayOfWeek: calculated, counselor, target, content }, ...prev]);
              setIsCounselingModalOpen(false); showToast(`📝 ${target} 성도의 심방보고가 등록되었습니다.`);
            }} className="space-y-3 text-[11px]">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">심방 일자</label>
                  <input name="counselingDate" type="date" defaultValue={currentSelectedYmd} className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 focus:outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">대상 성도명</label>
                  <input name="target" type="text" className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 focus:outline-none font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">심방자 입력 (교사 빠른 선택 가능)</label>
                <div className="flex gap-2">
                  <input id="form_counselor_name_input" name="counselorName" type="text" placeholder="심방자 이름 기입..." className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 focus:outline-none font-bold" />
                  <select onChange={(e) => { if (e.target.value) document.getElementById('form_counselor_name_input').value = e.target.value; }} className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 text-xs font-bold focus:outline-none">
                    <option value="">-- 교사 선택 --</option>
                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name} ({t.role})</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">내용 및 방법</label>
                <textarea name="content" rows="4" className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-2 focus:outline-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-700">
                <button type="button" onClick={() => setIsCounselingModalOpen(false)} className="bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg font-bold">취소</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold">등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {agentInputModal.open && activeAgentData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-4xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700">
              <div>
                <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold block">전도 성과 기록지</span>
                <h3 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5"><User className="h-4 w-4 text-indigo-400" /><span>{activeAgentData.sheetTitle} - </span><strong className="text-indigo-400 font-black">{activeAgentData.memberName}</strong> <span>요원 일일 전도 성과 기록</span></h3>
              </div>
              <button onClick={() => setAgentInputModal({ open: false, sheetId: '', memberName: '' })} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="overflow-x-auto border border-slate-800 rounded-xl">
              <table className="w-full text-center text-xs divide-y divide-slate-800">
                <thead className="bg-slate-900 text-slate-300">
                  <tr className="divide-x divide-slate-800">
                    <th className="py-2.5 font-bold w-28">구분</th><th className="py-2">월요일</th><th className="py-2">화요일</th><th className="py-2">수요일</th><th className="py-2">목요일</th><th className="py-2">금요일</th><th className="py-2">토요일</th><th className="py-2">일요일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/20 font-bold">
                  <tr className="divide-x divide-slate-800">
                    <td className="py-3 bg-slate-900/40 text-blue-400 font-bold">찾기</td>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                      <td key={day} className="p-1"><input type="number" value={activeAgentData.member.daily[day]?.finding || 0} onChange={(e) => handleCellChange(activeAgentData.sheetId, activeAgentData.memberName, day, 'finding', e.target.value)} className="w-16 bg-slate-950 border border-slate-700 text-center font-bold text-white rounded-lg p-1 focus:border-blue-500" /></td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-slate-800">
                    <td className="py-3 bg-slate-900/40 text-amber-400 font-bold">따기</td>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                      <td key={day} className="p-1"><input type="number" value={activeAgentData.member.daily[day]?.plucking || 0} onChange={(e) => handleCellChange(activeAgentData.sheetId, activeAgentData.memberName, day, 'plucking', e.target.value)} className="w-16 bg-slate-950 border border-slate-700 text-center font-bold text-white rounded-lg p-1 focus:border-amber-500" /></td>
                    ))}
                  </tr>
                  <tr className="divide-x divide-slate-800">
                    <td className="py-3 bg-slate-900/40 text-emerald-400 font-bold">복음방</td>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                      <td key={day} className="p-1"><input type="number" value={activeAgentData.member.daily[day]?.gospel || 0} onChange={(e) => handleCellChange(activeAgentData.sheetId, activeAgentData.memberName, day, 'gospel', e.target.value)} className="w-16 bg-slate-950 border border-slate-700 text-center font-bold text-white rounded-lg p-1 focus:border-emerald-500" /></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-750">
              <span className="text-[10px] text-slate-500 font-semibold">* 입력 결과는 실시간 통합 자동 연계 반영됩니다.</span>
              <button onClick={() => setAgentInputModal({ open: false, sheetId: '', memberName: '' })} className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl">기록 완료</button>
            </div>
          </div>
        </div>
      )}
      {isNewWeekModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-700">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><Plus className="h-4 w-4 text-indigo-400" /> <span>신규 주간 대장 신설</span></h3>
              <button onClick={() => setIsNewWeekModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-bold">주차 번호</label>
                <input type="number" value={newWeekNumInput} onChange={(e) => setNewWeekNumInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-center focus:outline-none" />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-bold">시작 날짜 (월요일)</label>
                <input type="date" value={newWeekStartInput} onChange={(e) => setNewWeekStartInput(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold text-center focus:outline-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-700">
                <button onClick={() => setIsNewWeekModalOpen(false)} className="bg-slate-700 text-slate-300 px-4 py-2 rounded-xl font-bold">취소</button>
                <button onClick={handleAddWeeklySheetDirect} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-bold">개설</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}