const PlatformBenefits = () => {
    return (
        <section className="container mx-auto md:px-6 px-2">
            <div className="py-16">
                <h2 className="md:text-6xl text-3xl md:px-0 px-2 font-medium">
                    Who Benefits from Our Platform?
                </h2>
                <div className="mt-16 border-t border-dashed border-white/50">
                    <div className="grid lg:grid-cols-3 xl:gap-8 gap-6 md:px-6 -mt-4 text-black">
                        <div className="flex gap-3">
                            <div className="">
                                <span className="py-3 font-semibold px-4 inline-block bg-[#BCECD7] rounded-2xl">
                                    01
                                </span>
                            </div>
                            <div className="p-6 bg-[#BCECD7] rounded-xl">
                                <h4 className="text-2xl font-semibold mb-4">
                                    Developers
                                </h4>
                                <li className="xl:text-base lg:text-sm">
                                    Efficiently manage project tasks &
                                    timelines.
                                </li>
                                <li className="xl:text-base lg:text-sm">
                                    Collaborate with team members on coding
                                    projects.
                                </li>
                                <li className="mb-2 xl:text-base lg:text-sm">
                                    Track and prioritize coding tasks
                                    seamlessly.
                                </li>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="">
                                <span className="py-3 font-semibold px-4 inline-block bg-[#CACDFF] rounded-2xl">
                                    02
                                </span>
                            </div>
                            <div className="p-6 bg-[#CACDFF] rounded-xl">
                                <h4 className="text-2xl font-semibold mb-4">
                                    Corporate Professionals
                                </h4>
                                <li className="xl:text-base lg:text-sm">
                                    Coordinate team projects effortlessly.
                                </li>
                                <li className="xl:text-base lg:text-sm">
                                    Enhance communication and collaboration
                                    among team members.
                                </li>
                                <li className="mb-2 xl:text-base lg:text-sm">
                                    Monitor project progress and meet deadlines
                                    consistently.
                                </li>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="">
                                <span className="py-3 font-semibold px-4 inline-block bg-[#FBE2AA] rounded-2xl">
                                    03
                                </span>
                            </div>
                            <div className="p-6 bg-[#FBE2AA] rounded-xl">
                                <h4 className="text-2xl font-semibold mb-4">
                                    Project Managers
                                </h4>
                                <li className="xl:text-base lg:text-sm">
                                    Streamline project planning and execution.
                                </li>
                                <li className="xl:text-base lg:text-sm">
                                    Foster a collaborative and productive
                                    project management environment.
                                </li>
                                <li className="mb-2 xl:text-base lg:text-sm">
                                    Monitor team progress and address potential
                                    roadblocks.
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformBenefits;
