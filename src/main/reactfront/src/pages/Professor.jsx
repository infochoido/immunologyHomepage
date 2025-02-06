import PageTitle from "../components/PageTitle";


export default function Professor() {
    return (
        <div>
            <PageTitle/>
            <div className="flex flex-row p-4 gap-12 mt-4">
                <div className="flex flex-col basis-9/10">
                    <div className="flex items-center">
                        {/* 이미지 */}
                        <img
                            className="w-48 h-auto"
                            src="../assets/professorimg.png"
                            alt="professor"
                        />
                        
                        {/* 텍스트 */}
                        <div className="ml-4 text-base">
                            <div className="text-2xl mb-4">
                                김원일
                                <div className="text-lg text-gray-500">Kim Wonil</div>  
                            </div>

                            <table className="w-full border-collapse">
                                <tbody>
                                    <tr>
                                        <td className="py-1 pr-4 font-semibold">전공</td>
                                        <td>수의면역학</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1 pr-4 font-semibold">직위</td>
                                        <td>교수</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1 pr-4 font-semibold">전화번호</td>
                                        <td>063)850-0958</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1 pr-4 font-semibold">이메일</td>
                                        <td>kwi0621@jbnu.ac.kr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className="text-2xl font-bold mb-4">학력</div>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>학사: 경북대학교 수의과대학</li>
                            <li>석사: 경북대학교 수의과대학 미생물학</li>
                            <li>박사: Iowa 주립대학교 수의과대학 미생물학</li>
                            <li>Diplomate of American College of Veterinary Microbiologists, specialty in Virology</li>
                        </ul>

                        <div className="text-2xl font-bold mt-12 mb-4">경력</div>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>2000-2002 가축위생연구사: 국립수의과학검역원</li>
                            <li>2002-2006 연구조교: Iowa 주립대학교 수의과대학</li>
                            <li>2007-2009 Iowa 주립대학교 수의과대학 교수</li>
                            <li>2009-현재 전북대학교 수의과대학 교수</li>
                            <li>(재)한국동물용의약품평가연구원장</li>
                        </ul>

                        <div className="text-2xl font-bold mt-12 mb-4">대표논문</div>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>Kim S-C, Jeong C-G, Nazki S, Lee S-I, Baek Y-C, Jung Y-J, Kim W-I. 2021. Evaluation of a multiplex PCR method for thedetection of porcine parvovirus types 1 through 7 using various field samples. PLoS ONE, 16:1</li>
                            <li>Lim B, Kim S, Lim K-S, Jeong C-G, Kim S-C, Lee S-M, Park C-K, Pas MFW, Cho H, Kim T-H, Lee K-T, Kim W-I, Kim J-M. 2020. Integrated time-serial transcriptome networks reveal common innate and tissue-specific adaptive immune responses to PRRSV infection. Veterinary Research, 51:128</li>
                            <li>Nazki S, Khatun A, Jeong C-G, Mattoo, SS, Gu S, Lee S-I, Kim S-C, Park J-H, Yang M-S, Kim B, Park C-K, Lee S-M, Kim W-I. 2020. Evaluation of local and systemic immune responses in pigs experimentally challenged with porcine reproductive and respiratory syndrome virus. Veterinary Research, 51:66</li>
                            <li> Khatun A, Nazki S, Jeong C-G, Gu S, Mattoo, SS, Lee S-I, Yang M-S, Lim B, Kim K-S, Lee K-T, Kim B, Park C-K, Lee S-M, Kim W-I. 2020. Effect of polymorphisms in porcine guanylate-binding proteins on host resistance to PRRSV infection in experimentally challenged pigs. Veterinary Research, 51:14</li>
                            <li>Khatun A, Park SY, Shabir N, Nazki S, Kang A-R, Jeong C-G, Seo B-J, Yang M-S, Kim B, Seo Y-H, Kim W-I. 2019. Evaluation of the Inhibitory Effects of (E)-1-(2-hydroxy-4,6-dimethoxyphenyl)-3-(naphthalen-1-yl) prop-2-en-1-one (DiNap), a Natural Product Analog, on the Replication of Type 2 PRRSV In Vitro and In Vivo. Molecules, 24:887</li>
                            <li>Shabir N, Khatun A, Nazki S, Gu S, Lee S-M, Hur T-Y, Yang M-S, Kim B, Kim W-I. 2018. In vitro immune responses of porcine alveolar macrophages reflect host immune responses against porcine reproductive and respiratory syndrome viruses. BMC Veterinary Research, 14:380</li>
                            <li>Kim S-C, Nazki S, Kwon S, Jhung J-H, Mun K-H, Jeon D-Y, Jeong C-G, Khatun A, Kang S-J, Kim W-I. 2018. The prevalence and genetic characteristics of porcine circovirus type 2 and 3 in Korea. BMC Veterinary Research, 14:294</li>
                            <li>Shabir N, Khatun A, Nazki S, Kim B, Choi E-J, Sun D, Yoon K-J, Kim W-I. 2016. Attempts to enhance cross-protection against porcine reproductive and respiratory syndrome viruses using chimeric viruses containing structural genes from two antigenically distinct strains. Viruses, 8, 240</li>
                            <li>Sun D, Khatun A, Kim W-I, Cooper V, Cho Y-I, Wang C, Choi E-J, Yoon K-J. 2016. Attempts to enhance cross-protection against porcine reproductive and respiratory syndrome viruses using chimeric viruses containing structural genes from two antigenically distinct strains. Vaccine, 34: 4335-4342</li>
                            <li>Khatun A, Shabir N, Seo B-S, Kim B, Yoon K-J, Kim W-I. 2016. The attenuation phenotype of a ribavirin-resistant porcine reproductive and respiratory syndrome virus (PRRSV) was maintained during sequential passages in pigs. Journal of Virology, 90: 4454-4468</li>
                            <li>Niu P, Shabir N, Khatun A, Seo B-J, Gu S, Lee S-M, Lim S-K, Kim K-S, Kim W-I. 2016. Effect of polymorphisms in the GBP1, Mx1 and CD163 genes on host responses to PRRSV infection in pigs. Veterinary Microbiology, 182: 187-195</li>
                            <li>Seo B-J, Kim H-I, Cho H-S, Park B-Y, Kim W-I. 2015. Evaluation of two commercial PRRSV antibody ELISA kits with samples of known status and singleton reactors. J Vet Med Sci, 78: 133-138</li>
                            <li>Khatun A, Shabir N, Yoon K-J, Kim W-I. 2015. Effects of ribavirin on the replication and genetic stability of procine reproductive and respiratory syndrome virus. BMC Veterinary Research, 11:21</li>
                            <li>Kim W-I, Kim J-J, Cha S-H, Wu W-H, Evans R, Yoon K-J. 2013. Significance of genetic variation of PRRSV ORF5 in virus neutralization and molecular determinants corresponding to cross neutralization among PRRS viruses. Veterinary Microbiology, 162: 10-22</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  