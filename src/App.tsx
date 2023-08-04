import calculateLogoDesktop from '@/assets/calculate_desktop.png';
import calculateLogoMobile from '@/assets/calculate_mobile.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import InputField from './components/atoms/InputField/InputField';
import useMediaQuery from './hooks/useMediaQuery';
import { schema } from './utils';

interface FormValues {
  day: number;
  month: number;
  year: number;
}

const App = () => {
  const [days, setDays] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  const desktopMatches = useMediaQuery('(min-width: 1024px)');

  const daysMotionValue = useMotionValue(days);
  const roundedDays = useTransform(daysMotionValue, Math.round);

  const monthsMotionValue = useMotionValue(months);
  const roundedMonths = useTransform(monthsMotionValue, Math.round);

  const yearsMotionValue = useMotionValue(years);
  const roundedYears = useTransform(yearsMotionValue, Math.round);

  const currentDate = new Date();

  useEffect(() => {
    // Animate the days, months, and years independently
    const daysAnimation = animate(daysMotionValue, days, { duration: 1 });
    const monthsAnimation = animate(monthsMotionValue, months, {
      duration: 1,
      delay: 1,
    });
    const yearsAnimation = animate(yearsMotionValue, years, {
      duration: 1,
      delay: 2,
    });

    return () => {
      yearsAnimation.stop();
      monthsAnimation.stop();
      daysAnimation.stop();
    };
  }, [days, months, years]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<FormValues> = ({ day, month, year }) => {
    const birthDate = new Date(year, month - 1, day);

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      ageYears -= 1;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      const daysInLastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      ageDays += daysInLastMonth;
      ageMonths -= 1;
    }

    setIsActive(true);
    setYears(ageYears);
    setMonths(ageMonths);
    setDays(ageDays);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-[840px] flex-col gap-y-8 rounded-3xl rounded-br-[100px] bg-primaryWhite px-6 py-12 lg:p-14"
      >
        <section className="flex gap-x-4 lg:gap-x-8">
          <InputField
            id="day"
            type="number"
            labelText="day"
            placeholder="dd"
            autoComplete="off"
            error={errors.day}
            {...register('day')}
          />

          <InputField
            id="month"
            type="number"
            labelText="month"
            placeholder="mm"
            autoComplete="off"
            error={errors.month}
            {...register('month')}
          />

          <InputField
            id="year"
            type="number"
            labelText="year"
            placeholder="yyyy"
            autoComplete="off"
            error={errors.year}
            {...register('year')}
          />
        </section>
        <section className="relative my-8 h-[1px] bg-primaryLine">
          <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primaryPurple duration-200 hover:bg-primaryBlack lg:left-full lg:h-24 lg:w-24 lg:-translate-x-3/4">
            <img
              src={desktopMatches ? calculateLogoDesktop : calculateLogoMobile}
              alt="calculate icon"
            />
          </button>
        </section>
        <section className="text-[56px] font-extrabold leading-[110%] text-primaryBlack lg:text-[104px]">
          <div>
            <motion.span className="text-primaryPurple">
              {isActive ? roundedYears : '--'}
            </motion.span>{' '}
            years
          </div>
          <div>
            <motion.span className="text-primaryPurple">
              {isActive ? roundedMonths : '--'}
            </motion.span>{' '}
            months
          </div>
          <div>
            <motion.span className="text-primaryPurple">
              {isActive ? roundedDays : '--'}
            </motion.span>{' '}
            days
          </div>
        </section>
      </form>
    </main>
  );
};

export default App;
